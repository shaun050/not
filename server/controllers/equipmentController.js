const Equipment = require("../models/equipment");
const mongoose = require("mongoose");
/**
 * get /
 * Homepage
 */

exports.homepage = async(req, res)=> {

    const message = req.flash("info");

   const locals = {
    title: "Inventory",
description: "Free NodeJs User Managment System"  
 }
 let perPage = 6;
 let page = req.query.page || 1;

        
    try {
        const equipments = await Equipment.aggregate([{$sort: {updatedAt: -1}}])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await Equipment.countDocuments();

        res.render("index", {
            locals, 
            equipments,
            current: page,
            pages: Math.ceil(count / perPage),
            message
        });
        } catch (error) {
        console.log(error);
    }
    
} 

/* exports.homepage = async(req, res)=> {

    const message = req.flash("info");

   const locals = {
    title: "Inventory",
description: "Free NodeJs User Managment System"   }
        
    try {
        const equipments = await Equipment.find({});
        res.render("index", { locals, message, equipments} );
    } catch (error) {
        console.log(error);
    }
    
} */

/**
 * get /
 * New Equipment Form
 */
exports.addEquipment = async(req, res)=> {

    const locals = {
     title: "Add New Equipment",
 description: "Free NodeJs Equipment Managment System"   }
         
     res.render("equipment/add", locals);
 }

 /**
 * Post /
 * Create New Equipment Form
 */
exports.postEquipment = async(req, res)=> {

  console.log(req.body);

    const newEquipment = new Equipment({
        equipName:req.body.equipName,
        equipID:req.body.equipID,
        quan:req.body.quan,
        details:req.body.details
        


    });
   
 try{
    await Equipment.create(newEquipment);
    await req.flash("info", "New Equipment has been added.")
    await Equipment.insertMany([
        
    ]);
    res.redirect("/");


 } catch(error){
    console.log(error);
 
 const locals = {
    title: "Add New Equipment",
    description: "Free NodeJs User Managment System"
};
         
     res.render("equipment/add", locals);
}
 }
//GET
 // Get Equipment Data
 exports.view = async(req, res)=> {
 
try{
    const equipment = await Equipment.findOne({_id: req.params.id})

    const locals = {
        title: "View Equipment Data",
        description: "Free NodeJs User Managment System"
    };
    res.render("equipment/view", {
        locals, 
        equipment
    })
} catch(error){
    console.log(error);
}
 }

//GET
//Edit Equipment Data 
exports.edit = async(req, res)=> {
 
    try{
        const equipment = await Equipment.findOne({_id: req.params.id})
    
        const locals = {
            title: "Edit Equipment Data",
            description: "Free NodeJs User Managment System"
        };
        res.render("equipment/edit", {
            locals, 
            equipment
        })
    } catch(error){
        console.log(error);
    }
     }

//GET
//UPDATE EQUIPMENT DATA
     exports.editPost = async(req, res)=> {
 
        try{
            const equipment = await Equipment.findByIdAndUpdate(req.params.id,{
            equipName: req.body.equipName,
            equipID: req.body.equipID,
            quan: req.body.quan,
            details: req.body.details,
            updatedAt: Date.now()
            });

            res.redirect(`/edit/${req.params.id}`);
            
        } catch(error){
            console.log(error);
        }
         }



//DELETE EQUIPMENT DATA
exports.deleteEquipment = async(req, res)=> {
 
    try{
        await Equipment.deleteOne({_id: req.params.id});
        res.redirect("/")
}
catch(error){
        console.log(error);
    }
     }
//GET
//SEARCH EQUIPMENT DATA
exports.searchEquipment = async (req, res) => {
    const locals = {
      title: "Search Equipment Data",
      description: "Free NodeJs User Management System",
    };
  
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const equipments = await Equipment.find({
        $or: [
          { equipName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          { equipID: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        ],
      });
  
      res.render("search", {
        equipments,
        locals,
      });
    } catch (error) {
      console.log(error);
    }
  };

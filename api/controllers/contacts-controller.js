const Contact = require('../models/contact-model');
class ContactsController {

    //get all contacts
     getAll = () => {
        return async (req, res, next) => {
           const userId = req.userData.id;
           const {count, rows} = await Contact.findAndCountAll({
            where: {user_id: userId}
           });
           res.status(200).json({
               success: true,
               total: count,
               data: rows
           });
        }
     }

//Create a new conatct
     create = () => {
        return async (req, res, next) => {
         try {
            const userId = req.userData.id;
            const conctact = await Contact.create({
               fname: req.body.fname,
               lname: req.body.lname,
               email: req.body.email,
               phone: req.body.phone,
               user_id: userId
            }) ;
            res.status(201).json({success: true, contact: conctact});

         } catch(err){
             res.status(422).json(err.errors);
         }
        }
     }

     //find contact by id

     findById = () => {
        return async(req, res, next) => {
            const userId = req.userData.id;
            const contactId = req.params.id;
            const contact = await Contact.findOne({
               where: {
                  id: contactId,
                  user_id: userId
               }
            });
            const resp = {success: false, contact: null};
            if(contact){
               resp.success = true;
               resp.contact = contact;
            }
            res.status(200).json(resp);
        }
     }

     //Update a contact
     update = () => {
        return async (req, res, next) => {
         const userId = req.userData.id;
         const contactId = req.params.id;
         const resp = { success: false, contact: null, msg: "Contact not found" }; ;
         const contact = await Contact.findOne({
            where: {
               id: contactId,
               user_id: userId
            }
         }) ;
         if(contact){
            const vals = {
               fname: req.body.fname,
               lname: req.body.lname,
               email: req.body.email,
               phone: req.body.phone
            } ;
            await Contact.update(vals, {where: {id: contact.id}});
            await contact.reload();
            resp.success = true;
            resp.msg = 'Contact updated successfully';
            resp.contact = contact;
         }
         res.status(200).json(resp);
        }
     }

     //Delete a contact

     delete = () => {
        return async (req, res, next) => {
         const userId = req.userData.id;
         const contactId = req.params.id;
         const contact = await Contact.findOne({
            where: {
               id: contactId,
               user_id: userId
            }
         });
         const resp = { success: false, contact: null, msg: "Contact not found" }; ;
         if(contact){
            await Contact.destroy({where: {id: contact.id}});
            resp.success = true;
            resp.msg = 'Contact deleted successfully';
            resp.contact = contact;
         }
         res.status(200).json(resp);
        }
     }
}


module.exports = new ContactsController();
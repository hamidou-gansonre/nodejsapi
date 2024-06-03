class ContactsController {
     getAll = () => {
        return (req, res, next) => {
            res.status(200).json({
                success: true,
                data: [
                    {fname: "Hamidou", lname: "Gansonre", phone: "66236850"},
                    {fname: "Hamid", lname: "Gansonre", phone: "68389819"},
                
                ]
            });
        }
     }

     create = () => {
        return (req, res, next) => {
             res.status(200).json({success: true, method: "create"}) ;
        }
     }

     findById = () => {
        return (req, res, next) => {
             res.status(200).json({success: true, method: "findById"}) ;
        }
     }

     update = () => {
        return (req, res, next) => {
             res.status(200).json({success: true, method: "update"}) ;
        }
     }

     delete = () => {
        return (req, res, next) => {
             res.status(200).json({success: true, method: "delete"}) ;
        }
     }
}


module.exports = new ContactsController();
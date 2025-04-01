const postProducts = async (req, res) =>{
 const {
    name, 
    shortDescription, 
    longDescription, 
    price, 
    currentPrice, 
    category, 
    images, 
    tags
 } = req.body;

 const mandatoryFields = ["name", "shortDescription", "longDescription", "price", "category", "images"];

 for(const field of mandatoryFields) {
    if(!req.body[field]) {
        return res.status(400).json({
            success: false,
            message: `${field} is required`
        });
    }
 }
};

export { postProducts };
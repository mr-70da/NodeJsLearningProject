const fs = require('fs');
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));
exports.getAllUsers = (req,res)=>{


}
exports.getUser = (req,res)=>{
    
};
exports.updateUser = (req,res)=>{

}
exports.deleteUser = (req,res)=>{
    
}
exports.createUser = (req,res)=>{}
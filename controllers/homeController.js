const homeView = (req,res) => {
    
    res.render("home",{
            
    });
}
const hello = (req,res) =>{
    res.render("projet",{})
}

module.exports = {
    homeView,
    hello
};
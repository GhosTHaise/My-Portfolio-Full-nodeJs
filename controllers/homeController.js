const homeView = (req,res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
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
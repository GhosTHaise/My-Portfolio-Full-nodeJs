
const skillView = (req,res) =>{
    res.render("skill",{
        data : "ModelSkill",
    });
}
const skillList = (req,res) => {
    res.render("projet",{

    })
}

module.exports = {
    skillView,
    skillList
}
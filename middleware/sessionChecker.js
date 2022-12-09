const sessionChecker = (req) => {
    if(req.session.userId)
    {
        return true;
    }
    else return false;
}

module.exports = sessionChecker
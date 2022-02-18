const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) =>
{
    const error = { status: 400 };
    const { name, budget } = req.body;
    if (name === undefined || budget === undefined)
    {
        error.message = 'name and budget are required';
        next(error);
    } else if (typeof name !== 'string')
    {
        error.message = "name of account must be a string";
        next(error);
    } else if (name.trim().length < 3 || name.trim().length > 100)
    {
        error.message = "name of account must be between 3 and 100";
        next(error);
    }
};

exports.checkAccountNameUnique = (req, res, next) =>
{
    // DO YOUR MAGIC
    console.log("checkAccountNameUnique middleware");
    next();
};

exports.checkAccountId = async (req, res, next) =>
{
    try
    {
        const account = await Account.getById(req.params.id);
        if (!account)
        {
            next({ status: 404, message: 'account not found' });
        } else
        {
            req.account = account;
            next();
        }
    } catch (err)
    {
        next(err);
    }

};

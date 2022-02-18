const router = require('express').Router();
const Account = require('./accounts-model');

const {
    checkAccountId,
    checkAccountPayload,
    checkAccountNameUnique } = require('./accounts-middleware');

router.get('/', async (req, res, next) =>
{
    try
    {
        const accounts = await Account.getAll();
        res.json(accounts);
    } catch (err)
    {
        next(err);
    }
});

router.get('/:id', checkAccountId, async (req, res, next) =>
{
    res.json(req.account);
    //     try
    //     {
    //         const account = await Account.getById(req.params.id)
    //         res.json(account);
    //     } catch (err)
    //     {
    //         next(err);
    //     }
    });

    router.post(
        '/',
        checkAccountPayload,
        checkAccountNameUnique,
        (req, res, next) =>
        {
            try
            {
                res.json("post account");
            } catch (err)
            {
                next(err);
            }
        });

    router.put(
        '/:id',
        checkAccountId,
        checkAccountPayload,
        checkAccountNameUnique,
        (req, res, next) =>
        {
            try
            {
                res.json("update account");
            } catch (err)
            {
                next(err);
            }
        });

    router.delete('/:id', checkAccountId, (req, res, next) =>
    {
        try
        {
            res.json("delete account");
        } catch (err)
        {
            next(err);
        }
    });

    router.use((err, req, res, next) =>
    {
        res.status(err.status || 500).json({
            message: err.message
        });
    });

    module.exports = router;

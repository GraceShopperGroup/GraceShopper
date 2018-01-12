const router = require('express').Router();
const { Product, Review } = require('../db/models');

router.get('/', (req, res, next) =>
    Product.findAll()
        .then(products => res.json(products))
        .catch(next)
);

router.post('/', (req, res, next) => {
    if (req.user.isAdmin)
        Product.create(req.body)
            .then(product => res.status(201).json(product))
            .catch(next)
    else next(err)
})

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id, { include: [Review] })
        .then(product => res.json(product))
        .catch(next)
});

router.put('/:id', (req, res, next) => {
    if (req.user.isAdmin)
        Product.update(req.body)
            .then(product => res.json(product))
            .catch(next)
    else next(err)
})

router.delete('/:id', (req, res, next) => {
    if (req.user.isAdmin)
        Product.destroy({ where: { id: req.params.id } })
            .then(() => req.status(204))
            .catch(next)
    else next(err)
})

module.exports = router;

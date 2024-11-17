import { Router } from 'express';
import { convertCategory, convertVendors } from '../utils/convertData';
import axios from 'axios';
import { getCategories, getVendors } from '../database/api/ontology';
export const router = Router();
router.get('/GetCategories', function (req, res) {
    getCategories()
        .then(axios.spread((...r) => {
        const categories = {
            specificProblem: convertCategory(r[0]),
            accessibleData: convertCategory(r[1]),
            dataProduct: convertCategory(r[2]),
        };
        res.send(categories);
    }))
        .catch(() => res.send('error'));
});
router.get('/GetVendors', function (req, res) {
    getVendors()
        .then((r) => {
        res.send(convertVendors(r));
    })
        .catch(() => res.send([]));
});

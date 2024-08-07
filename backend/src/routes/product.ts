import {Router} from 'express';

const router = Router();

//* Product Routes

router.get('/product',(req, res)=>{
    return res.status(200).json({message: 'Get /product is working'})
})
router.post('/product',(req, res)=>{
    return res.status(200).json({message: 'Post /product is working'})
})
router.get('/product/:id',(req, res)=>{
    return res.status(200).json({message: 'Get /product/:id is working'})
})
router.put('/product/:id',(req, res)=>{
    return res.status(200).json({message: 'Put /product/:id is working'})
})
router.delete('/product/:id',(req, res)=>{
    return res.status(200).json({message: 'Delete /product/:id is working'})
})

export default router;

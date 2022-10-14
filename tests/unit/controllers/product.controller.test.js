
const {Product}=require("../../../models");
const ProductController = require("../../../Controllers/product.controllers");
const {mockRequest, mockResponse} = require("../interceptor");
const newProductData= require("../../mock-data/new-product.json");

let req,res;

beforeEach(()=>{
    req=mockRequest();
    res=mockResponse();
})


describe("Product Controller create test",()=>{

    beforeEach(()=>{
        req.body=newProductData;
    })

    afterEach(() => {    
        jest.clearAllMocks();
      });

    it("happy case for create product call",async ()=>{

        req.isAdmin=true;

        let spy= jest.spyOn(Product,'create')
        .mockImplementation((newProductData)=>{
            return Promise.resolve(newProductData);
        })

        await ProductController.create(req,res);

        await expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newProductData);

    });


    it("create called with normal user",async ()=>{

        req.isAdmin=false;

        let spy= jest.spyOn(Product,'create')
        .mockImplementation((newProductData)=>{
            return Promise.resolve(newProductData);
        })

        await ProductController.create(req,res);

        await expect(spy).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();

    });

    it("create called : server error",async ()=>{

        req.isAdmin=true;

        let spy= jest.spyOn(Product,'create')
        .mockImplementation(()=>{
            return Promise.reject(new Error("This is an error"));
        })

        await ProductController.create(req,res);

        await expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({message:"This is an error"});

    });
})


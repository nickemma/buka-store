"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.deleteOrder = exports.updateOrder = exports.getOrder = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order_model"));
// Create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = new order_model_1.default(req.body);
        yield newOrder.save();
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again...' });
    }
});
exports.createOrder = createOrder;
// Get a single order by ID
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.findById(req.params.id)
            .populate('order_items.cuisine_id')
            .populate('order_owner')
            .populate('order_buka');
        if (order) {
            res.status(200).json(order);
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again...' });
    }
});
exports.getOrder = getOrder;
// Update an order by ID
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again...' });
    }
});
exports.updateOrder = updateOrder;
// Delete an order by ID
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield order_model_1.default.findByIdAndDelete(req.params.id);
        if (deletedOrder) {
            res.status(200).json({ message: 'Order deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again...' });
    }
});
exports.deleteOrder = deleteOrder;
// Get all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find()
            .populate('order_items.cuisine_id')
            .populate('order_owner')
            .populate('order_buka');
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again...' });
    }
});
exports.getAllOrders = getAllOrders;

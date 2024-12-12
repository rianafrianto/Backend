const Item = require("../models/itemsModels.js")
const moment = require('moment');

const getAllItems = async (req, res) => {
    try {
        const result = await Item.findAll({ where: { deleted_at: null } });
        res.status(200).json({
            success: true,
            message: "Get All Item Success",
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const getItemById = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id, {
            where: { deleted_at: null }
        });
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json({
            success: true,
            message: "Get Item By Id Success",
            data: item
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    const { name, description  } = req.body;

    try {
        // Validasi
        if (!name || !description ) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        // Create Table
        const newItem = await Item.create({
            name,
            description,
        });

        res.status(201).json({
            success: true,
            message: "Create Item Success",
            data: newItem
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const item = await Item.findByPk(id, {
            where: {
                deleted_at: null
            }
        });

        if (!item) {
            return res.status(404).json({ error: 'Item not found or has been deleted' });
        }

        item.name = name || item.name;
        item.description = description || item.description;

        await item.save();

        res.status(201).json({
            success: true,
            message: "Update Item Success",
            data: item
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const softDeleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id, {
            where: {
                deleted_at: null
            }
        });

        if (!item) {
            return res.status(404).json({ error: 'Item not found or already deleted' });
        }

        item.deleted_at = moment().format('YYYY-MM-DD HH:mm:ss');
        await item.destroy();

        res.status(200).json({ 
            success: true, 
            message: 'Item successfully soft deleted', 
            data : item 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getAllItems, getItemById, createItem, updateItem, softDeleteItem };
import express from "express";
import { createDesignation, getDesignations } from "../controllers/designationController.js";

const router = express.Router();

router.post("/", createDesignation);
router.get("/", getDesignations);

export default router;

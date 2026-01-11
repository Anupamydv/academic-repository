const express = require("express");
const router = express.Router();

/**
 * Redirect browser to Cloudinary PDF
 */
router.get("/view", (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing file URL");
  }

  // Force inline display
  const redirectUrl = url.includes("?")
    ? `${url}&fl_attachment=false`
    : `${url}?fl_attachment=false`;

  return res.redirect(302, redirectUrl);
});

module.exports = router;

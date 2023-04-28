import puppeteer from "puppeteer";
import nfcSchema from "../schema/nfcSchema";

const pdf = async (req, res) => {
  try {
    const nfcdata = await nfcSchema
      .findOne({ _id: req.query.id }).populate('User').populate('Author').populate('Owner')
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((e) => {
        return e;
      });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const encodedData = encodeURIComponent(JSON.stringify(nfcdata));
    const url = `http://192.168.18.59:3002/templates/pdf.html?data=${encodedData}`;

    // Load the HTML file into the page
    await page.goto(url);
    await page.evaluate((data) => {
      document.getElementById("date1").textContent = data.CreationDate.slice(0,10);
      document.getElementById("date2").textContent = data.CreationDate.slice(0,10);
      document.getElementById("publication1").textContent = "test";
      document.getElementById("publication2").textContent = "test";
      document.getElementById("creation1").textContent = data.Title;
      document.getElementById("creation2").textContent = data.Title;
      document.getElementById("collection1").textContent = "test";
      document.getElementById("collection2").textContent = "test";
      document.getElementById("description1").textContent = data?.Description;
      document.getElementById("description2").textContent = data?.Description;
      document.getElementById("owner1").textContent = data?.Owner[0]?.FirstName;
      document.getElementById("owner2").textContent = data?.Owner[0]?.FirstName;
      document.getElementById("author1").textContent = data?.Author[0]?.FirstName;
      document.getElementById("author2").textContent = data?.Author[0]?.FirstName;
      document.getElementById("issue1").textContent = "test";
      document.getElementById("issue2").textContent = "test";
    }, nfcdata);

    // Generate a PDF from the page
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    // Set the content type of the response to 'application/pdf'
    res.contentType("application/pdf");

    // Set the content disposition header to indicate that the response should be downloaded as a file
    res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');

    // Send the PDF file as the response
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while generating the PDF.");
  }
};
export default pdf;

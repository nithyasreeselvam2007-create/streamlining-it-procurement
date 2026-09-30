const http = require("http");
const url = require("url");

const PORT = 3000;

// Standard laptop details
const standardLaptop = {
    model: "Dell Latitude 5440",
    processor: "Intel Core i5",
    ram: "16 GB",
    storage: "512 GB SSD",
    operatingSystem: "Windows 11 Pro",
    price: 65000
};

// Create laptop order
function createLaptopOrder(employeeName, department) {
    const orderId = "LAP-" + Math.floor(1000 + Math.random() * 9000);

    return {
        orderId: orderId,
        employeeName: employeeName,
        department: department,
        laptop: standardLaptop,
        status: "Pending Approval",
        createdAt: new Date().toLocaleString()
    };
}

// Approval process
function approveOrder(order) {
    order.status = "Approved";
    order.message = "Laptop procurement order has been approved.";
    return order;
}

// HTTP Server
const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);

    // Home page
    if (req.method === "GET" && parsedUrl.pathname === "/") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
<!DOCTYPE html>
<html>
<head>
    <title>IT Procurement Automation</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            margin: 0;
            padding: 0;
        }

        .header {
            background: #1f4e78;
            color: white;
            padding: 25px;
            text-align: center;
        }

        .container {
            width: 600px;
            margin: 40px auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }

        input {
            width: 95%;
            padding: 12px;
            margin: 8px 0 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            width: 100%;
            padding: 13px;
            background: #1f4e78;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background: #163a5c;
        }

        .laptop {
            background: #eef5fb;
            padding: 15px;
            margin-top: 20px;
            border-radius: 7px;
        }

        h2 {
            color: #1f4e78;
        }
    </style>
</head>

<body>

<div class="header">
    <h1>IT Procurement Automation</h1>
    <p>Streamlining IT Procurement</p>
    <p>Automating Standard Laptop Order with Flow Designer</p>
</div>

<div class="container">

    <h2>Standard Laptop Request</h2>

    <form action="/order" method="GET">

        <label>Employee Name</label>
        <input type="text" name="employee" required>

        <label>Department</label>
        <input type="text" name="department" required>

        <button type="submit">
            Submit Laptop Request
        </button>

    </form>

    <div class="laptop">
        <h3>Standard Laptop Configuration</h3>
        <p><b>Model:</b> Dell Latitude 5440</p>
        <p><b>Processor:</b> Intel Core i5</p>
        <p><b>RAM:</b> 16 GB</p>
        <p><b>Storage:</b> 512 GB SSD</p>
        <p><b>OS:</b> Windows 11 Pro</p>
        <p><b>Price:</b> ₹65,000</p>
    </div>

</div>

</body>
</html>
        `);

        return;
    }

    // Process laptop order
    if (req.method === "GET" && parsedUrl.pathname === "/order") {

        const employee = parsedUrl.query.employee;
        const department = parsedUrl.query.department;

        if (!employee || !department) {
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });

            res.end("Employee name and department are required.");
            return;
        }

        let order = createLaptopOrder(employee, department);

        // Automatic approval
        order = approveOrder(order);

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
<!DOCTYPE html>
<html>
<head>
    <title>Order Confirmation</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            padding: 40px;
        }

        .box {
            max-width: 650px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }

        .success {
            background: #e8f5e9;
            padding: 15px;
            border-radius: 5px;
            color: #2e7d32;
        }

        .details {
            background: #eef5fb;
            padding: 20px;
            margin-top: 20px;
            border-radius: 5px;
        }

        a {
            display: inline-block;
            margin-top: 20px;
            text-decoration: none;
            background: #1f4e78;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
        }
    </style>
</head>

<body>

<div class="box">

    <h1>Laptop Order Confirmation</h1>

    <div class="success">
        <h3>✓ Order Approved Successfully</h3>
        <p>${order.message}</p>
    </div>

    <div class="details">

        <h3>Order Details</h3>

        <p><b>Order ID:</b> ${order.orderId}</p>

        <p><b>Employee:</b> ${order.employeeName}</p>

        <p><b>Department:</b> ${order.department}</p>

        <p><b>Laptop:</b> ${order.laptop.model}</p>

        <p><b>Processor:</b> ${order.laptop.processor}</p>

        <p><b>RAM:</b> ${order.laptop.ram}</p>

        <p><b>Storage:</b> ${order.laptop.storage}</p>

        <p><b>Operating System:</b> ${order.laptop.operatingSystem}</p>

        <p><b>Price:</b> ₹${order.laptop.price}</p>

        <p><b>Status:</b> ${order.status}</p>

        <p><b>Order Date:</b> ${order.createdAt}</p>

    </div>

    <a href="/">Create Another Request</a>

</div>

</body>
</html>
        `);

        return;
    }

    // Page not found
    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.end("404 - Page Not Found");
});

// Start server
console.log("Starting server...");
server.listen(PORT, () => {
    console.log("------------------------------------------");
    console.log("IT Procurement Automation System");
    console.log("------------------------------------------");
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("Standard Laptop Order System is Ready!");
});
import Customer from "../models/customer.js";

export const createCustomer = async (req, res) => {
  const { name, phone, address, note, created_by, updated_by } = req.body;
  const newCustomer = new Customer({
    name,
    phone,
    address,
    note,
    created_by,
    updated_by,
  });
  try {
    const checkCustomer = await Customer.findOne({ name, phone, address });
    if (checkCustomer) {
      return res.status(404).json({ message: "Khách hàng đã tồn tại" });
    }
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCustomers = async (req, res) => {
  const { sort, page, keyword, limit = 5 } = req.query;
  const searchOptions = {};
  if (keyword) {
    searchOptions.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { phone: { $regex: keyword, $options: "i" } },
    ];
  }
  try {
    if (page === "all") {
      // Trường hợp yêu cầu tất cả dữ liệu từ tất cả các trang
      const customers = await Customer.find(searchOptions).sort(
        sort || "createdAt"
      );
      if (customers.length === 0) {
        return res.status(400).json({ message: "No customers found" });
      }
      return res.status(200).json(customers);
    } else {
      const options = {
        page: parseInt(page, 10) || 1,
        limit: limit || 5,
        sort: sort || "createdAt", // Sắp xếp theo 'name' mặc định (có thể sử dụng 'phone' để sắp xếp theo số điện thoại)
      };
      const customers = await Customer.paginate(searchOptions, options);
      if (customers.length === 0) {
        return res.status(400).json({ message: "No customers found" });
      }
      return res.status(200).json(customers);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  await Customer.findByIdAndDelete(id);
  res.json({ message: "Customer deleted successfully." });
};

// Hàm để xuất dữ liệu từ model Mongoose thành tệp Excel
async function exportCustomersToExcel(filePath) {
  try {
    // Lấy dữ liệu khách hàng từ model Mongoose
    const customers = await Customer.find();

    // Chuẩn bị dữ liệu cho tệp Excel
    const data = customers.map((customer) => ({
      Name: customer.name,
      Phone: customer.phone,
      Address: customer.address,
      Note: customer.note,
      CreatedBy: customer.created_by,
      UpdatedBy: customer.updated_by,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    // Ghi tệp Excel xuống đĩa
    XLSX.writeFile(workbook, filePath);

    console.log(
      `Dữ liệu khách hàng đã được xuất thành tệp Excel tại: ${filePath}`
    );
  } catch (error) {
    console.error("Lỗi khi xuất dữ liệu thành tệp Excel:", error);
  }
}

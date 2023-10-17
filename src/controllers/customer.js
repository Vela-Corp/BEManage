import Customer from "../models/customer.js";

export const createCustomer = async (req, res) => {
  const customer = req.body;
  const newCustomer = new Customer(customer);
  try {
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCustomers = async (req, res) => {
  const { sort, page, keyword } = req.query;
  const searchOptions = {};
  if (keyword) {
    searchOptions.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { phone: { $regex: keyword, $options: "i" } },
    ];
  }
  try {
    const options = {
      page: parseInt(page, 10) || 1,
      limit: 10,
      sort: sort || "createdAt", // Sắp xếp theo 'name' mặc định (có thể sử dụng 'phone' để sắp xếp theo số điện thoại)
    };
    const customers = await Customer.paginate(searchOptions, options);
    if (customers.length === 0) {
      return res.status(400).json({ message: "No customers found" });
    }
    return res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  await Customer.findByIdAndDelete(id);
  res.json({ message: "Customer deleted successfully." });
};

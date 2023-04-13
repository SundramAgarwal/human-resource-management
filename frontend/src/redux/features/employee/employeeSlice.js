import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";
import { toast } from "react-toastify";

const initialState = {
  employee: null,
  employees: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Employee
export const createEmployee = createAsyncThunk(
  "employees/create",
  async (formData, thunkAPI) => {
    try {
      return await employeeService.createEmployee(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all Employees
export const getEmployees = createAsyncThunk(
  "employees/getAll",
  async (_, thunkAPI) => {
    try {
      return await employeeService.getEmployees();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// delete Employee
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, thunkAPI) => {
    try {
      return await employeeService.deleteEmployee(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get Employee
export const getEmployee = createAsyncThunk(
  "employees/getEmployee",
  async (id, thunkAPI) => {
    try {
      return await employeeService.getEmployee(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// update Employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({id,formData}, thunkAPI) => {
    try {
      return await employeeService.updateEmployee(id,formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    } 
  }
);

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
      CALC_STORE_VALUE(state, action) {
        const employees = action.payload
        const array = []
        employees.map((item) => {
            const {price, quantity} = item
            const employeeValue = price * quantity
            return array.push(employeeValue)
        });
        const totalValue = array.reduce((a,b) => {
            return a + b
        }, 0)
        state.totalStoreValue = totalValue
      },
      CALC_OUTOFSTOCK(state,action) {
        const employees = action.payload
        const array = []
        employees.map((item) => {
            const { quantity } = item;
            return array.push(quantity)
        });
        let count = 0
        array.forEach((number) => {
          if (number === 0 || number === '0') {
            count += 1
          }
        })
        state.outOfStock = count
      },
      CALC_CATEGORY(state,action) {
        const employees = action.payload
        const array = []
        employees.map((item) => {
            const { category } = item;
            return array.push(category)
        });
        const uniqueCategory = [...new Set(array)]
        state.category = uniqueCategory
      }
    },
    extraReducers: (builder) => {
      builder
        // for create employee
        .addCase(createEmployee.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createEmployee.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          console.log(action.payload);
          state.employees.push(action.payload);
          toast.success("Employee added successfully");
        })
        .addCase(createEmployee.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
        
        // for get all Employees getEmployees
        .addCase(getEmployees.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getEmployees.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          console.log(action.payload);
          state.employees = action.payload;
        })
        .addCase(getEmployees.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })  
        // for delete Employee
        .addCase(deleteEmployee.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Employee deleted successfully")
        })
        .addCase(deleteEmployee.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        }) 
        // get Employee
        .addCase(getEmployee.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getEmployee.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.employee = action.payload
        })
        .addCase(getEmployee.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        }) 
        // update Employee
        .addCase(updateEmployee.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateEmployee.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Employee updated successfully")
        })
        .addCase(updateEmployee.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        }) 
    },
  });
  
  export const { CALC_STORE_VALUE,CALC_OUTOFSTOCK,CALC_CATEGORY} = employeeSlice.actions;
  
  export const selectIsLoading = (state) => state.employee.isLoading;
  export const selectEmployee = (state) => state.employee.employee;
  export const selectTotalStoreValue = (state) => state.employee.totalStoreValue;
  export const selectOutOfStock = (state) => state.employee.outOfStock;
  export const selectCategory = (state) => state.employee.category;
  
  export default employeeSlice.reducer;



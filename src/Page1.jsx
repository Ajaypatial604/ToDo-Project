import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Page1.css";

let storedData = JSON.parse(localStorage.getItem("formData") || []);
let person = {
  name: "",
  mobileNo: "",
  gender: "",
  checked: false,
  array: [],
};
const Page1 = () => {
  let [data, setData] = useState(person);
  let [array, setArray] = useState(storedData);
  let [userErr, setUserErr] = useState();
  let [mobileErr, setMobileErr] = useState();
  let [isEditing, setIsEditing] = useState(false);
  let [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(array));
  }, [array]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
    if (e.target.name === "name") {
      setUserErr(
        e.target.value.length < 7 ? "Minimum 7 characters required!!" : ""
      );
    } else if (e.target.name === "mobileNo") {
      setMobileErr(
        isNaN(e.target.value) || e.target.value.length !== 10
          ? "Mobile number length must be equal to 10"
          : ""
      );
    }
  }

  function saveData(e) {
    e.preventDefault();
    if (!userErr && !mobileErr && data.checked) {
      if (data.name && data.mobileNo && data.gender) {
        if (isEditing) {
          let updatedArray = [...array];
          updatedArray[editIndex] = data;
          setArray(updatedArray);
        } else {
          setArray([...array, data]);
        }
        setData(person);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        alert("Please fill the form before submitting.....");
      }
    } else {
      alert("Please fill the form according to the validation.....");
    }
  }
  function updateData(i) {
    setEditIndex(i);
    setIsEditing(true);
    setData(array[i]);
  }
  function deleteData(i) {
    if (window.confirm("Are you sure?") === true) {
      let updatedArray = [...array];
      updatedArray.splice(i, 1);
      setArray(updatedArray);
    }
  }
  return (
    <div className="form">
      <h1>ToDo Project</h1>
      <Form onSubmit={saveData}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            value={data.name}
            placeholder="Enter your name"
          />
          <Form.Text className="warning">{userErr}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="number"
            name="mobileNo"
            onChange={handleChange}
            value={data.mobileNo}
            placeholder="Enter your mobile number"
          />
          <Form.Text className="warning">{mobileErr}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select your Gender:</Form.Label>
          <Form.Select
            name="gender"
            value={data.gender}
            onChange={handleChange}
          >
            <option value="">Default select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Trans-gender</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Check me out"
            name="checked"
            checked={data.checked}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isEditing ? "Update" : "Submit"}
        </Button>
      </Form>

      {array.length > 0 ? (
        <Table striped>
          <caption>User Data</caption>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Name</th>
              <th>Mobile No.</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {array.map((a, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}.</td>
                  <td>{a.name}</td>
                  <td>{a.mobileNo}</td>
                  <td>{a.gender}</td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        updateData(i);
                      }}
                    >
                      Update
                    </Button>
                    &nbsp;
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        deleteData(i);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page1;

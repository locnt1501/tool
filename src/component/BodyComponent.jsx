import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Input } from 'antd';
import React, { useState } from "react";

const BodyComponent = () => {
  const [dataInput, setDataInput] = useState([]);
  const [dataOutput, setDataOutput] = useState([]);
  const [fileName, setFileName] = useState("default")
  const propsIn = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        let reader = new FileReader();
        reader.onload = (e) => {
          let arrTemp = []
          e.target.result.split(/\r?\n/).map((value, idx) => {
            if (value) {
              arrTemp.push(value)
              setDataInput(arrTemp);
            }
            return 0;
          })
        }
        reader.readAsText(info.file.originFileObj);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const propsOut = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        let reader = new FileReader();
        reader.onload = (e) => {
          let arrTemp = []
          e.target.result.split(/\r?\n/).map((value, idx) => {
            if (value && value.includes("(1)")) {
              var doc = new DOMParser().parseFromString(value, "text/xml");
              doc.firstChild.innerHTML = "ABC"
              arrTemp.push(doc.documentElement.outerHTML)
              setDataOutput(arrTemp);
            } else {
              arrTemp.push(value)
            }
            return 0;
          })
        }
        reader.readAsText(info.file.originFileObj);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const handleGen = () => {
    download(dataOutput.join("\n"));
  }
  const download = (text) => {
    var blob = new Blob([text], { type: "text/plain" });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = fileName + ".html";
    a.click();
  }
  return (
    <div>
      <div>
        <h1>Input</h1>
        <Upload {...propsIn}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>
      <div>
        <h1>Output</h1>
        <Upload {...propsOut}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>
      <div>
        <h1>File name</h1>
        <Input placeholder="Basic usage" onChange={(e) => {setFileName(e.target.value)}}/>;
      </div>
      <Button type="primary" onClick={handleGen}>Primary Button</Button>
    </div>
  );
}
export default BodyComponent;
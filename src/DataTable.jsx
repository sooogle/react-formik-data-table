import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';

function DataTable() {
  const blankData = { name: '', quantity: 0, unit_price: 0 };
  const initialDataList = [
    { name: 'ダイニングテーブル', quantity: 1, unit_price: 20000 },
    { name: 'イス', quantity: 3, unit_price: 5000 },
    { name: 'センターテーブル', quantity: 1, unit_price: 15000 },
    { name: 'ソファ', quantity: 2, unit_price: 12000 },
  ];
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <Formik initialValues={{ dataList: initialDataList }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      validationSchema={
        Yup.object().shape({
          dataList: Yup.array().of(Yup.object().shape({
            name: Yup.string().required("入力必須です"),
            quantity: Yup.number().required("入力必須です"),
          }))
        })
      }
      enableReinitialize>
      {(formikProps) => (
        <Form>
          <FieldArray name="dataList">
            {(arrayHelper) => (<>
              <div className="mb-2 float-right">
                <button className="btn btn-sm btn-outline-secondary mr-1"
                  disabled={selectedIndex < 1}
                  onClick={(e) => {
                    e.preventDefault();
                    arrayHelper.swap(selectedIndex - 1, selectedIndex);
                    setSelectedIndex(i => i - 1);
                  }}>↑</button>
                <button className="btn btn-sm btn-outline-secondary mr-1"
                  disabled={selectedIndex < 0 || selectedIndex === formikProps.values.dataList.length - 1}
                  onClick={(e) => {
                    e.preventDefault();
                    arrayHelper.swap(selectedIndex, selectedIndex + 1)
                    setSelectedIndex(i => i + 1);
                  }}>↓</button>
              </div>
              <table className='table table-sm table-bordered'>
                <thead className='thead-light'>
                  <tr>
                    <th className="text-center">#</th>
                    <th>品名</th>
                    <th>数量</th>
                    <th className="text-center">単価</th>
                    <th className="text-center">総額</th>
                    <th className="text-center">アクション</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    formikProps.values.dataList.map((data, index) => (
                      <tr key={index} className={index === selectedIndex && "table-primary"}>
                        <td className="align-middle text-center">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input className="form-check-input" type="radio" checked={index === selectedIndex}
                                onChange={() => setSelectedIndex(index)} />
                              {index + 1}
                            </label>
                          </div>
                        </td>
                        <td className="align-middle">
                          <Field type="text" className="form-control" name={`dataList[${index}].name`} />
                          <ErrorMessage name={`dataList[${index}].name`} />
                        </td>
                        <td className="align-middle">
                          <Field type="number" className="form-control" name={`dataList[${index}].quantity`} />
                          <ErrorMessage name={`dataList[${index}].quantity`} />
                        </td>
                        <td className="align-middle text-right">
                          {data.unit_price}
                        </td>
                        <td className="align-middle text-right">
                          {data.quantity * data.unit_price}
                        </td>
                        <td className="align-middle text-center">
                          <button className="btn btn-sm btn-outline-secondary mr-1"
                            onClick={(e) => {
                              e.preventDefault();
                              arrayHelper.insert(index + 1, blankData);
                              setSelectedIndex(index + 1);
                              }}>＋</button>
                          {formikProps.values.dataList.length > 1 && (
                            <button className="btn btn-sm btn-outline-danger"
                              onClick={(e) => {
                                e.preventDefault();
                                arrayHelper.remove(index);
                                setSelectedIndex(-1);
                              }}>ー</button>
                          )}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </>)}
          </FieldArray>
          <button type='submit' className="btn btn-primary">保存</button>
          <pre className="alert alert-primary mt-3">
            {JSON.stringify({ selectedIndex, ...formikProps.values }, null, 2)}
          </pre>
        </Form>
      )}
    </Formik>
  );
}

export default DataTable;
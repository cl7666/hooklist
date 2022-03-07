import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from 'axios'

const { confirm } = Modal
export default function RoleList() {
    const [dataSource, setDataSource] = useState([])
    const [rightList, setRightList] = useState([])
    const [currentRights, setCurrentRights] = useState([])
    const [currentId, setCurrentId] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: "角色名称",
            dataIndex: "roleName",
        },
        {
            title: "操作",
            render: (item) => {
                return (
                    <div>
                        <Button
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            style={{ marginRight: 10 }}
                            onClick={() => confirmMethod(item)}
                        />
                        <Button type="primary" shape="circle" icon=
                            {<EditOutlined />} onClick={() => {
                                setIsModalVisible(true)
                                setCurrentRights(item.rights)
                                setCurrentId(item.id)
                            }} />
                    </div>
                );
            },
        },
    ]
    const confirmMethod = (item) => {
        confirm({
            title: "你确定要删除?",
            icon: <ExclamationCircleOutlined />,
            // content: "Some descriptions",
            onOk() {
                deleteMethod(item);
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const deleteMethod = (item) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`http://localhost:5000/roles/${item.id}`)
    }

    useEffect(() => {
        axios
            .get("http://localhost:5000/roles")
            .then((res) => setDataSource(res.data))
            .catch((e) => console.log(e));
        axios
            .get("http://localhost:5000/rights?_embed=children")
            .then((res) => setRightList(res.data))
            .catch((e) => console.log(e));
    }, [refresh]);

    const handleOk = () => {
        setIsModalVisible(false);
        axios.patch(`http://localhost:5000/roles/${currentId}`, {
            rights: currentRights
        })
            .then(setRefresh)
            .catch((e) => console.log(e))
    };
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const onCheck = (checkedKeys) => {
        // console.log(checkedKeys);
        setCurrentRights(checkedKeys.checked)
    }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                rowKey={(item) => item.id}></Table>
            <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    checkedKeys={currentRights}
                    onCheck={onCheck}
                    checkStrictly={true}
                    treeData={rightList}
                />
            </Modal>
        </div>
    )
}

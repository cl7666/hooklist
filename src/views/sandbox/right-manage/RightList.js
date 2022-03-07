import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from 'axios';

const { confirm } = Modal;

export default function RightList() {
    const [dataSource, setDataSource] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
            res.data.forEach((item) =>
                item.children?.length === 0 ? (item.children = "") : item.children
            );
            setDataSource(res.data);
        });
    }, [refresh]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: "权限名称",
            dataIndex: "title",
        },
        {
            title: "权限路径",
            dataIndex: "key",
            render: (key) => {
                return <Tag color="volcano">{key}</Tag>;
            },
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
                        <Popover content={<div style={{ textAlign: "center" }}>
                            <Switch checked={item.pagepermission} onChange={() => {
                                switchMethod(item)
                            }}></Switch>
                        </div>} title="页面配置项" trigger={
                            item.pagepermission === undefined ? '' : 'click'}>
                            <Button type="primary" shape="circle" icon=
                                {<EditOutlined />} disabled={
                                    item.pagepermission === undefined} />
                        </Popover>
                    </div>
                );
            },
        },
    ];
    const switchMethod = (item) => {
        item.pagepermission = item.pagepermission === 1 ? 0 : 1
        setDataSource([...dataSource])
        if (item.grade === 1) {
            axios.patch(`http://localhost:5000/rights/${item.id}`, {
                pagepermission: item.pagepermission
            })
        } else {
            axios.patch(`http://localhost:5000/children/${item.id}`, {
                pagepermission: item.pagepermission
            })
        }
    }
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
        if (item.grade === 1) {
            axios.delete(`http://localhost:5000/rights/${item.id}`)
                .then(setRefresh)
                .catch((e) => console.log(e))
        } else {
            axios.delete(`http://localhost:5000/children/${item.id}`)
                .then(setRefresh)
                .catch((e) => console.log(e))
        }
    }
    return (
        <Table dataSource={dataSource} columns={columns}
            pagination={{
                pageSize: 5,
            }} />
    )
}

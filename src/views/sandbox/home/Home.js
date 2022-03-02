import React from 'react'
import { Button } from 'antd'
import axios from 'axios'

export default function Home() {
    const ajax = () => {
        //取数据
        // axios.get("http://localhost:8000/posts").then(res => {
        //     console.log(res.data)
        // });
        // 增
        // axios.post("http://localhost:8000/posts", {
        //     title: "3333",
        //     author: "xiaoming"
        // })
        // 修改
        // axios.put("http://localhost:8000/posts/1", {
        //     title: "1111"
        // })
        // 更新
        // axios.patch("http://localhost:8000/posts/1",{
        //     title:"111"
        // })
    }
    return (
        <div>
            <Button type='primary' onClick={ajax}>Button</Button>
        </div>
    )
}

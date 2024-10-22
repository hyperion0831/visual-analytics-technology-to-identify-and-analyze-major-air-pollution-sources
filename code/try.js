import t01 from "./help/01.json"
import t02 from "./help/02.json"
import t03 from "./help/03.json"
import t04 from "./help/04.json"
import t05 from "./help/05.json"
import t06 from "./help/06.json"
import t07 from "./help/07.json"
import t08 from "./help/08.json"
import t09 from "./help/09.json"
import t10 from "./help/10.json"
import t11 from "./help/11.json"
import t12 from "./help/12.json"
import t13 from "./help/13.json"
import t14 from "./help/14.json"
import t15 from "./help/15.json"
import t16 from "./help/16.json"
import t17 from "./help/17.json"
import t18 from "./help/18.json"
import t19 from "./help/19.json"
import t20 from "./help/20.json"
import t21 from "./help/21.json"
import t22 from "./help/22.json"
import t23 from "./help/23.json"
import t24 from "./help/24.json"
import t25 from "./help/25.json"
import t26 from "./help/26.json"
import t27 from "./help/27.json"
import t28 from "./help/28.json"
import t29 from "./help/29.json"
import t30 from "./help/30.json"
import t31 from "./help/31.json"
import { useEffect, useRef } from "react";
import * as echarts from 'echarts';
import shaanxi from './shaanxi.json'


export function Six(){
    const FigRef = useRef(null)
    const Fig1Ref = useRef(null)
    const Fig2Ref = useRef(null)
    
    const timeDatas = [t01,t02,t03,t04,t05,t06,t07,t08,t09,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20,t21,t22,t23,t24,t25,t26,t27,t28,t29,t30,t31]
    const timeStr = ["2013-01-01","2013-01-02","2013-01-03","2013-01-04","2013-01-05","2013-01-06","2013-01-07","2013-01-08","2013-01-09","2013-01-10","2013-01-11",
      "2013-01-12","2013-01-13","2013-01-14","2013-01-15","2013-01-16","2013-01-17","2013-01-18","2013-01-19","2013-01-20","2013-01-21","2013-01-22","2013-01-23",
      "2013-01-24","2013-01-25","2013-01-26","2013-01-27","2013-01-28","2013-01-29","2013-01-30","2013-01-31"]
    echarts.registerMap('shaanxi',shaanxi);
    const opFig = () =>{
      var options = []
      for (let index = 0; index < timeDatas.length; index++) {
        const datas = timeDatas[index];
        var relDatas = []
        for(let key in datas){
          relDatas.push({
            name:key,
            value:datas[key].center.concat(datas[key].AQI)
          })
        }
        options.push({
          title:{
            text:"这是2013年1月"+index+1+"日的数据"
          },
          geo: {
            map: 'shaanxi'
          },
          series:[
            {
              name: 'AQI',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: relDatas,
              symbolSize: function (val) {
                return val[2] / 5;
              },
              encode: {
                value: 2
              },
              label: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
          ]
        })
      }
      return options
    }
    function opFig1Data(city){
      const DateToStr = (date) =>{
        var year = date.getFullYear();
        var month =(date.getMonth() + 1).toString();
        var day = (date.getDate()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        var dateTime = year +"-"+ month +"-"+  day;
        return dateTime;
      }
      const date = new Date('2013-01-01');
      const end = new Date('2013-01-31');
      const data = [];
      const AQI = [];
      for (let index = 0; index < timeDatas.length; index++) {
        const datas = timeDatas[index];
        AQI.push(datas[city].AQI)
      }
      var i = 1;
      for (let time = date; i <= 31; time.setDate(i)) {
        console.log(time)
        data.push([
          DateToStr(time),
          AQI[i-1],
        ]);
        i ++;
      }
      console.log(data)
      return data;
    }
  
    const renderMap = ()=> {
      var map = echarts.init(FigRef.current);
      map.setOption({
        baseOption:{
          series:{
            name: 'AIR SHAANXI',
            type: 'map',
            roam: true,
            map: 'shaanxi',
          },
          tooltip: {
            trigger: 'item',
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'left',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
            iconStyle: {
              borderColor: "#000",
            },
            itemSize: 20,
            emphasis: {
              iconStyle: {
                borderColor: "#1f4c69",
              },
            },
          },
          roamController: {
            show: true,
            left: 'right',
            mapTypeControl: {
              'anhui': true
            }
          },
          timeline:{
            axisType: "category",
            progress:{
              label:{
              interval:'4',
            },},
            data:timeStr,
            playInterval:500,
            overflow:'breakAll'
            // show:false
          },
        },
        options:opFig()
      })
      var fig1 = echarts.init(Fig1Ref.current)
      fig1.setOption({
        title:{
          text:'西安市2013年一月AQI热力图'
        },
        visualMap: {
          show: false,
          min: 50,
          max: 200
        },
        calendar: {
          range: '2013-01'
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: opFig1Data('西安市'),
        }
      })
      var fig2 = echarts.init(Fig2Ref.current)
      fig2.setOption({
        title:{
          text:'铜川市2013年一月AQI热力图'
        },
        visualMap: {
          show: false,
          min: 50,
          max: 200
        },
        calendar: {
          range: '2013-01'
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: opFig1Data('铜川市'),
        }
      })
    }
  
    useEffect(()=>{
      renderMap();
    },[])
  
    return(
      <div style={{ width: "100%", height: "1000px" }}>
        <div style={{ width: "100%", height: "60%" }} ref={FigRef}></div>
          <div style={{ width: "100%", height: "20%" }} ref={Fig1Ref}></div>  
          <div style={{ width: "100%", height: "20%" }} ref={Fig2Ref}></div>  
      </div>
    )
  }
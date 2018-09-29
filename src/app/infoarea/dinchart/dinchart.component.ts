import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockServerService } from '../../services/mock-server.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as echarts from 'echarts';
// import { EChartOption } from 'echarts';
import { gexf } from 'echarts/extension/dataTool';

@Component({
  selector: 'anms-dinchart',
  templateUrl: './dinchart.component.html',
  styleUrls: ['./dinchart.component.css']
})
export class DinchartComponent implements OnInit {
  options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    },{
      data: [20, 32, 1, 34, 290, 330, 320],
      type: 'bar'
    }]
  };

  mergeOption: any;
  loading = false;

  // graphOption: Observable<EChartOption>;

  constructor(private api: MockServerService, private http: HttpClient) { }

  ngOnInit() {
    this.getData();
//    this.graphOption = this.http.get('../assets/les-miserables.gexf', { responseType: 'text' }).pipe(
      map(xml => {
        const graph = gexf.parse(xml);
        const categories = [];
        for (let i = 0; i < 9; i++) {
          categories[i] = {
            name: '类目' + i
          };
        }
        graph.nodes.forEach(function (node) {
          node.itemStyle = null;
          node.symbolSize = 10;
          node.value = node.symbolSize;
          node.category = node.attributes.modularity_class;
          // Use random x, y
          node.x = node.y = null;
          node.draggable = true;
        });
        return {
          title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {},
          legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {
              return a.name;
            })
          }],
          animation: false,
          series: [
            {
              name: 'Les Miserables',
              type: 'graph',
              layout: 'force',
              data: graph.nodes,
              links: graph.links,
              categories: categories,
              roam: true,
              label: {
                normal: {
                  position: 'right'
                }
              },
              force: {
                repulsion: 100
              }
            }
          ]
        };
      });
  }

  getData() {
    this.loading = true;
    this.api.getData()
      .then(data => {
        this.mergeOption = { series: [{ data }] };
      })
      .catch(e => { /** Error Handler */ })
      .then(() => { this.loading = false; });
  }
}

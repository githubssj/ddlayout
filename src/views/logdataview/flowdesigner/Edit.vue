<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>流程管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>流程编辑
        </BreadcrumbItem>
      </Breadcrumb>
      <div class="nsneo-module-btns">
        <ButtonGroup>
          <Button type="primary" @click="impflow">
            <Icon type="md-flash" />导入
          </Button>
          <Button type="primary" @click="expflow">
            <Icon type="ios-folder-open-outline" />导出
          </Button>

          <Button type="primary" @click="layoutflow">
            <Icon type="ios-book-outline" />格式排列
          </Button>
          <Button type="primary" @click="delSelected">
            <Icon type="ios-trash-outline" />删除节点
          </Button>
          <Button type="primary" @click="save">
            <Icon type="ios-checkbox" />保存流程
          </Button>
        </ButtonGroup>
      </div>

      <div style="float:right;height:40px;line-height:40px;margin-left:10px;margin-right:10px;">
        <input
          style="height:25px;line-height:25px;display: none !important;"
          @change="readFile"
          ref="importInput"
          type="file"
        />
      </div>
    </div>

    <div class="nsneo-mxgraph-content">
      <div class="nsneo-mxgraph-left">
        <div
          class="nsneo-mxgraph-left-itemset"
          v-for="grp in ctrlGroups"
          :key="grp.id"
          :name="grp.id"
        >
          <div class="nsneo-mxgraph-left-itemset-title">{{grp.groupName}}</div>

          <div class="nsneo-cascontent" slot="content">
            <div style="clear:both"></div>

            <div
              class="nsneo-flow-icon-ctrl"
              v-for="ctrl in grp.items"
              :key="ctrl.id"
              :data-itemid="ctrl.id"
              :title="ctrl.caption"
              style
            >
              <img class="nsneo-flow-icon-ctrl-img" :src="ctrl.img" />
              <div class="nsneo-flow-icon-ctrl-label">{{ctrl.name}}</div>
            </div>

            <div style="clear:both"></div>
          </div>
        </div>
      </div>
      <div class="nsneo-mxgraph-carea">
        <div ref="graph_container" class="split-pane-right-root"></div>
      </div>

      <div class="nsneo-mxgraph-right">
        <Form :model="mainForm" size="small">
          <FormItem label="流程名称">
            <Input v-model="mainForm.input" placeholder="请输入流程名称..."></Input>
          </FormItem>
          <FormItem label="业务类型">
            <Select v-model="mainForm.select">
              <Option value="单据驱动">单据驱动</Option>
              <Option value="消息驱动">消息驱动</Option>
              <Option value="数据驱动">数据驱动</Option>
            </Select>
          </FormItem>
          <FormItem label="创建日期">
            <Row>
              <Col span="24">
                <DatePicker
                  type="date"
                  placeholder="选择日期"
                  v-model="mainForm.date"
                  style="width:100%"
                ></DatePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="创建时间">
            <Row>
              <Col span="24">
                <TimePicker
                  type="time"
                  placeholder="选择时间"
                  v-model="mainForm.time"
                  style="width:100%"
                ></TimePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="状态">
            <Row>
              <Col span="24">
                <RadioGroup v-model="mainForm.radio">
                  <Radio label="using">在用</Radio>
                  <Radio label="cancel">作废</Radio>
                </RadioGroup>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="流程描述">
            <Input
              v-model="mainForm.textarea"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 8}"
              placeholder
            ></Input>
          </FormItem>
        </Form>
      </div>
    </div>
    <!---->

    <Modal
      v-model="editNode.show"
      title="节点设置"
      @on-ok="okNodeEdit"
      @on-cancel="cancelNodeEdit"
      width="800"
    >
      <div class="nsneo-settingdialog" v-if="editNode.mapData!=null">
        <Form v-model="editNode.mapData" :label-width="80">
          <FormItem label="名称">
            <Input placeholder="名称" v-model="editNode.mapData.name"></Input>
          </FormItem>

          <FormItem label="数据对象">
            <Select>
              <Option value="主单数据">主单数据</Option>
              <Option value="产品数据">产品数据</Option>
            </Select>
          </FormItem>

          <FormItem label="界面模板">
            <Select>
              <Option value="订单模板">订单模板</Option>
              <Option value="仓储模板">仓储模板</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import {
  mxGraph,
  mxClient,
  mxRubberband,
  mxDragSource,
  mxUtils,
  mxEvent,
  mxCell,
  mxGeometry,
  mxGraphHandler,
  mxEdgeHandler,
  mxGuide,
  mxKeyHandler,
  mxConstants,
  mxPerimeter,
  mxShape,
  mxConnectionConstraint,
  mxPoint,
  mxCellState,
  mxPolyline,
  mxRectangle,
  mxHierarchicalLayout,
  mxCompactTreeLayout,
  mxCodec,
  mxObjectCodec,
  mxCodecRegistry,
  mxGraphModel,
  mxDefaultKeyHandler
} from "mxgraph/javascript/mxClient";

import { callbackify } from "util";
import { Message } from "iview";

import bus from "../../../assets/bus";

//执行全局绑定
window.mxGraph = mxGraph;
window.mxGraphModel = mxGraphModel;
window.mxGeometry = mxGeometry;
window.mxDefaultKeyHandler = mxDefaultKeyHandler;

//全局图形对象，本页面全局使用
let graph = null;
//全局布局对象
let layout = null; //new mxHierarchicalLayout(graph);

//针对 mxgraph 的全局描述
try {
  // 禁止游离线条
  mxGraph.prototype.isCellMovable = cell => !cell.edge;
  // 禁止从将label从线条上拖离
  mxGraph.prototype.edgeLabelsMovable = false;

  // Enables guides
  mxGraphHandler.prototype.guidesEnabled = true;

  // Alt disables guides
  mxGuide.prototype.isEnabledForEvent = function(evt) {
    return !mxEvent.isAltDown(evt);
  };

  // Enables snapping waypoints to terminals
  mxEdgeHandler.prototype.snapToTerminals = true;

  //在节点边框上显示锚点
  mxGraph.prototype.getAllConnectionConstraints = function(terminal, source) {
    if (terminal != null && terminal.shape != null) {
      if (terminal.shape.stencil != null) {
        if (terminal.shape.stencil != null) {
          return terminal.shape.stencil.constraints;
        }
      } else if (terminal.shape.constraints != null) {
        return terminal.shape.constraints;
      }
    }

    return null;
  };

  // Edges have no connection points
  mxPolyline.prototype.constraints = null;

  // Disables built-in context menu
  //mxEvent.disableContextMenu(document.body);

  //定义锚点约束
  mxShape.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.25, 0), true),
    new mxConnectionConstraint(new mxPoint(0.5, 0), true),
    new mxConnectionConstraint(new mxPoint(0.75, 0), true),
    new mxConnectionConstraint(new mxPoint(0, 0.25), true),
    new mxConnectionConstraint(new mxPoint(0, 0.5), true),
    new mxConnectionConstraint(new mxPoint(0, 0.75), true),
    new mxConnectionConstraint(new mxPoint(1, 0.25), true),
    new mxConnectionConstraint(new mxPoint(1, 0.5), true),
    new mxConnectionConstraint(new mxPoint(1, 0.75), true),
    new mxConnectionConstraint(new mxPoint(0.25, 1), true),
    new mxConnectionConstraint(new mxPoint(0.5, 1), true),
    new mxConnectionConstraint(new mxPoint(0.75, 1), true)
  ];
} catch (e) {
  console.log("mxGuide,mxEdgeHandler,mxShape,设置错误");
  console.log(e);
}

//定义风格
const configureStylesheet = function(graph) {
  //设置画布风格
  let graphstyle = graph.getStylesheet().getDefaultVertexStyle();
  graphstyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
  graphstyle[mxConstants.STYLE_PERIMETER_SPACING] = 6;

  //设置节点风格
  let style = new Object();
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
  (style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter),
    (style[mxConstants.STYLE_ROUNDED] = true),
    (style[mxConstants.STYLE_ARCSIZE] = 6), // 设置圆角程度
    (style[mxConstants.STYLE_FONTCOLOR] = "#336666");
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
  style[mxConstants.STYLE_STROKECOLOR] = "#336666";
  style[mxConstants.STYLE_DASHED] = 1;

  style[mxConstants.STYLE_FILLCOLOR] = "#ffffff";

  style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
  style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
  style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
  style[mxConstants.STYLE_IMAGE_WIDTH] = "40";
  style[mxConstants.STYLE_IMAGE_HEIGHT] = "40";
  style[mxConstants.STYLE_SPACING_TOP] = "50";
  style[mxConstants.STYLE_SPACING] = "2";
  graph.getStylesheet().putCellStyle("node", style);

  const normalTypeStyle = {
    [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_IMAGE,
    [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter
  };
  graph.getStylesheet().putCellStyle("normalType", normalTypeStyle);

  //配置连线风格
  let edgestyle = graph.getStylesheet().getDefaultEdgeStyle();
  Object.assign(edgestyle, {
    [mxConstants.STYLE_ROUNDED]: true, // 设置线条拐弯处为圆角
    //[mxConstants.STYLE_STROKEWIDTH]: '2',
    [mxConstants.STYLE_STROKECOLOR]: "#333333",
    [mxConstants.STYLE_EDGE]: mxConstants.EDGESTYLE_ORTHOGONAL,
    [mxConstants.STYLE_FONTCOLOR]: "#33333",
    [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]: "#ffa94d"
  });
  // 设置拖拽线的过程出现折线，默认为直线
  graph.connectionHandler.createEdgeState = () => {
    let edge = graph.createEdge();
    return new mxCellState(this.view, edge, graph.getCellStyle(edge));
  };
};

//设置连线校验
const setConnectValidation = () => {
  // 连接边校验
  mxGraph.prototype.isValidConnection = (source, target) => {
    //console.log(source);
    //console.log(target);

    const sourceElementId = source.data.dataItemId;
    const targetElementId = target.data.dataItemId;

    console.log(
      "sourceElementId[" +
        sourceElementId +
        "],targetElementId[" +
        targetElementId +
        "]"
    );

    return true;
  };
};

//监听事件,针对节点的事件,和键盘事件
const listenGraphEvent = function() {
  //加入点击事件
  graph.addListener(mxEvent.CLICK, (sender, evt) => {
    const cell = evt.properties.cell;
    if (!cell) {
      return;
    }

    console.log("点击节点...");

    const clickNormalType = cell.style.includes("normalType");
    if (clickNormalType) {
      // 使用 mxGraph 事件中心，触发自定义事件
      //graph.fireEvent(new mxEventObject(mxEvent.NORMAL_TYPE_CLICKED, 'cell', cell));
      console.log("这是一个点击事件[normalType]...");
    }
  });

  //注册键盘事件
  const keyHandler = new mxKeyHandler(graph);
  let delkey = 46;
  keyHandler.bindKey(delkey, function(evt) {
    /*if (graph.isEnabled()) {
      graph.removeCells();
    }*/
    try {
      graph.removeCells();
    } catch (e) {
      console.log(e);
    }
  });
};

//节点上下文图标集合，上下文图标，针对上下文图标的点击事件
const mxIconSet = function(state) {
  this.images = [];
  var graph = state.view.graph;

  // 节点图标
  var img = mxUtils.createImage("/mxgraph/flowdemo/edit.png");
  img.setAttribute("title", "Duplicate");
  img.style.position = "absolute";
  img.style.cursor = "pointer";
  img.style.width = "16px";
  img.style.height = "16px";
  img.style.left = state.x + state.width + "px";
  img.style.top = state.y + state.height + "px";

  mxEvent.addGestureListeners(
    img,
    mxUtils.bind(this, function(evt) {
      //console.log(state.cell);
      /*
      try {
        Message.info(
          "编辑节点:" + state.cell.data.dataItemId + ",id:" + state.cell.id
        );
      } catch (e) {
        console.log(e);
        Message.info(e.Message);
      }*/

      try {
        /*RootVue.$Message.info(
          "编辑节点:" + state.cell.data.dataItemId + ",id:" + state.cell.id
        );*/
        //console.log('发送事件--------------')
        bus.$emit("nsneoEditNode", state);
      } catch (e) {
        console.log(e);
        RootVue.$Message.info(e.Message);
      }

      mxEvent.consume(evt);
      this.destroy();
    })
  );

  state.view.graph.container.appendChild(img);
  this.images.push(img);

  // Delete
  var img = mxUtils.createImage("/mxgraph/flowdemo/delete.png");
  img.setAttribute("title", "Delete");
  img.style.position = "absolute";
  img.style.cursor = "pointer";
  img.style.width = "16px";
  img.style.height = "16px";
  img.style.left = state.x + state.width + "px";
  img.style.top = state.y - 16 + "px";

  mxEvent.addGestureListeners(
    img,
    mxUtils.bind(this, function(evt) {
      // Disables dragging the image
      //mxEvent.consume(evt);
    })
  );

  mxEvent.addListener(
    img,
    "click",
    mxUtils.bind(this, function(evt) {
      graph.removeCells([state.cell]);
      mxEvent.consume(evt);
      this.destroy();
    })
  );

  state.view.graph.container.appendChild(img);
  this.images.push(img);
};

//节点上下文图标集合，定义自定义上下文图标的销毁方法
mxIconSet.prototype.destroy = function() {
  if (this.images != null) {
    for (var i = 0; i < this.images.length; i++) {
      var img = this.images[i];
      img.parentNode.removeChild(img);
    }
  }

  this.images = null;
};

//节点计数器,id
//let idSeed = 0;

// 拖放的功能函数，定义插入节点方法，注意this 的含义
const createNodeCellToGraph = function(graph, evt, target, x, y) {
  let cell = new mxCell(
    this.element.querySelector("div").innerText,
    new mxGeometry(0, 0, 70, 70),
    `node;image=${this.element.querySelector("img").src}`
  );
  // 自定义的业务数据放在 data 属性
  //idSeed++;
  cell.data = {
    refJsonId: uuid(), //定义节点编码
    refType: this.element.querySelector("div").innerText, //定义节点类型
    dataItemId: this.element.getAttribute("data-itemid")
  };

  cell.vertex = true;
  let cells = graph.importCells([cell], x, y, target);

  if (cells != null && cells.length > 0) {
    graph.scrollCellToVisible(cells[0]);
    graph.setSelectionCells(cells);
  }
};

//拖放的功能函数，定义绘制方法,判断是否在当前图形中绘制
const checkGraphDropPosition = function(evt) {
  let x = mxEvent.getClientX(evt);
  let y = mxEvent.getClientY(evt);
  let elt = document.elementFromPoint(x, y);

  if (mxUtils.isAncestorNode(graph.container, elt)) {
    return graph;
  }

  return null;
};

//绑定拖放,找到需要拖放的元素,并绑定拖放事件
const bindDrap = function() {
  //查找所有的可拖放的控件
  let dropctrls = document.querySelectorAll(".nsneo-flow-icon-ctrl");

  //循环所有的可拖放的节点控件
  dropctrls.forEach(ctrl => {
    //针对IE进行适配
    if (mxClient.IS_IE) {
      mxEvent.addListener(ctrl, "dragstart", function(evt) {
        evt.returnValue = false;
      });
    }

    // 创建拖放预览节点
    let dragElt = document.createElement("div");
    dragElt.className = "nsneo-flow-icon-ctrl";
    dragElt.setAttribute("data-itemid", ctrl.getAttribute("data-itemid"));
    //console.log(getId.getAttribute("data-id"));//48
    //console.log(ctrl);
    //预览节点图标
    let img = document.createElement("img");
    img.className = "nsneo-flow-icon-ctrl-img";
    img.src = ctrl.querySelector(".nsneo-flow-icon-ctrl-img").src;
    dragElt.appendChild(img);
    //预览节点标签
    let label = document.createElement("div");
    label.className = "nsneo-flow-icon-ctrl-label";
    label.innerText = ctrl.querySelector(
      ".nsneo-flow-icon-ctrl-label"
    ).innerText;
    dragElt.appendChild(label);

    //绑定预览节点动作
    let ds = mxUtils.makeDraggable(
      ctrl, //使DOM中的可拖动的元素
      checkGraphDropPosition, //判断拖放的元素是否在目标画板图形上 graph
      createNodeCellToGraph, //拖放执行成功后，创建新的节点到 graph中
      dragElt, //用来预览的拖放元素
      null,
      null,
      graph.autoscroll,
      true
    );

    // Redirects feature to global switch. Note that this feature should only be used
    // if the the x and y arguments are used in funct to insert the cell.
    ds.isGuidesEnabled = function() {
      return graph.graphHandler.guidesEnabled;
    };

    // Restores original drag icon while outside of graph
    ds.createDragElement = mxDragSource.prototype.createDragElement;

    //console.log(ds.createDragElement);
  });
};

//绑定鼠标移动上下文菜单
const bindMouseContextIcon = function() {
  // 在节点上显示删除和编辑图标
  var iconTolerance = 20;
  // 在节点上显示删除和编辑图标
  graph.addMouseListener({
    currentState: null,
    currentIconSet: null,
    mouseDown: function(sender, me) {
      // Hides icons on mouse down
      if (this.currentState != null) {
        graph.selectionModel.cells[0] = this.currentState.cell;
        this.dragLeave(me.getEvent(), this.currentState);
        this.currentState = null;
      } else {
        graph.selectionModel.cells = [];
      }
    },
    mouseMove: function(sender, me) {
      if (
        this.currentState != null &&
        (me.getState() == this.currentState || me.getState() == null)
      ) {
        var tol = iconTolerance;
        var tmp = new mxRectangle(
          me.getGraphX() - tol,
          me.getGraphY() - tol,
          2 * tol,
          2 * tol
        );

        if (mxUtils.intersects(tmp, this.currentState)) {
          return;
        }
      }

      var tmp = graph.view.getState(me.getCell());

      // Ignores everything but vertices
      if (
        graph.isMouseDown ||
        (tmp != null && !graph.getModel().isVertex(tmp.cell))
      ) {
        tmp = null;
      }

      if (tmp != this.currentState) {
        if (this.currentState != null) {
          this.dragLeave(me.getEvent(), this.currentState);
        }

        this.currentState = tmp;

        if (this.currentState != null) {
          this.dragEnter(me.getEvent(), this.currentState);
        }
      }
    },
    mouseUp: function(sender, me) {},
    dragEnter: function(evt, state) {
      if (this.currentIconSet == null) {
        this.currentIconSet = new mxIconSet(state);
      }
    },
    dragLeave: function(evt, state) {
      if (this.currentIconSet != null) {
        this.currentIconSet.destroy();
        this.currentIconSet = null;
      }
    }
  });
};

//vue 界面对象
export default {
  name: "nsneomxgraphdemo",
  components: {},
  data() {
    return {
      split: 0.15,
      openPanel: "-",
      splitmin: "200px",
      ctrlGroups: [],
      mainForm: {
        input: "新业务流程",
        select: "消息驱动",
        radio: "using",
        checkbox: [],
        switch: true,
        date: new Date().format("yyyy-MM-dd"),
        time: new Date().format("hh:mm:ss"),
        slider: [20, 50],
        textarea: ""
      },
      editNode: {
        show: false,
        node: null,
        mapData: null
      }
    };
  },
  computed: {},
  methods: {
    save() {
      this.$router.replace("./flowdesignerlist");
    },
    delSelected() {
      try {
        if (graph.isEnabled()) {
          graph.removeCells();
        }
      } catch (e) {
        console.log(e);
      }
    },
    expflow() {
      console.log("导出流程图");
      let encoder = new mxCodec();
      let node = encoder.encode(graph.getModel());
      console.log(mxUtils.getXml(node));
      let content = mxUtils.getXml(node);
      let blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "MxGraphDemo.xml"); //saveAs(blob,filename) //仅限于chorme的下载目录里
      //alert("export OK")
    },
    impflow() {
      console.log("导入流程图");
      this.$refs.importInput.click();
    },
    layoutflow() {
      console.log("重排流程图");
      layout.execute(graph.getDefaultParent());
    },
    readFile(evt) {
      console.log("读入文件");
      const file = evt.target.files[0];
      //console.log(file);
      const reader = new FileReader();
      reader.onload = e => {
        let txt = e.target.result;
        console.log("测试，导入的数据为:");
        console.log(txt);
        graph.getModel().beginUpdate();
        try {
          let doc = mxUtils.parseXml(txt);
          let root = doc.documentElement;
          let dec = new mxCodec(root.ownerDocument);
          dec.decode(root, graph.getModel());
        } finally {
          console.log("执行导入,更新数据");
          graph.getModel().endUpdate();
          //防止键盘事件失效
          try {
            graph.container.setAttribute("tabindex", "-1");
            graph.container.focus();
          } catch (e) {
            console.log(e);
          }
        }

        //测试，导入的数据然后反向生成
        let encoder = new mxCodec();
        let node = encoder.encode(graph.getModel());
        console.log("测试，导入的数据然后反向生成");
        console.log(mxUtils.getXml(node));
      };
      reader.readAsText(file);
    },
    initMXGraph() {
      //初始化图形控件，全局对象
      graph = new mxGraph(this.$refs.graph_container);
      new mxRubberband(graph);

      //配置画布及节点风格
      configureStylesheet(graph);

      //初始化布局对象，全局对象
      layout = new mxCompactTreeLayout(graph, false);

      //设置能够连接
      graph.setConnectable(true);

      // 禁止游离线条
      graph.setDisconnectOnMove(false);
      graph.setAllowDanglingEdges(false);

      // 固定节点大小
      graph.setCellsResizable(false);

      // 禁止调整线条弯曲度
      graph.setCellsBendable(false);

      // 连线可以被预览
      graph.connectionHandler.createEdgeState = function(me) {
        var edge = graph.createEdge(null, null, null, null, null);

        return new mxCellState(
          this.graph.view,
          edge,
          this.graph.getCellStyle(edge)
        );
      };

      // 设置连线的风格
      graph.getStylesheet().getDefaultEdgeStyle()["edgeStyle"] =
        "orthogonalEdgeStyle";

      //绑定拖放
      bindDrap();

      //设置连接线的校验
      setConnectValidation();
      //监听事件
      listenGraphEvent();

      //绑定鼠标异形上下文菜单
      bindMouseContextIcon();

      //防止键盘事件失效
      try {
        graph.container.setAttribute("tabindex", "-1");
        graph.container.focus();
      } catch (e) {
        console.log(e);
      }
    },
    destroyMXGraph() {
      graph.destroy();
      graph = {};
    },
    nsneoEditNode(state) {
      console.log("编辑节点...");
      console.log(state);
      this.editNode.show = true;
      this.editNode.node = state;
      this.editNode.mapData = { name: state.cell.getValue() };
    },
    okNodeEdit() {
      console.log("节点编辑，确定");
      console.log("节点名称更改为:" + this.editNode.mapData.name);
      this.editNode.node.cell.setValue(this.editNode.mapData.name);
      graph.refresh(this.editNode.node.cell);
    },
    cancelNodeEdit() {
      console.log("节点编辑，取消");
      this.editNode.show = null;
      this.editNode.node = null;
      this.editNode.mapData = null;
    }
  },
  mounted() {
    console.log("mounted...");
    //获得需要展示的流程控件
    this.$nsneohttp
      .get(GLobal_Api_Urls.MxGraphDemo_FlowDesignitems)
      .then(httpdata => {
        this.ctrlGroups = httpdata.datas;
        setTimeout(() => {
          this.openPanel = this.ctrlGroups[0].id;

          //初始化
          this.initMXGraph();
        }, 500);
      });

    console.log("编辑界面的数据编码[" + this.$route.query.id + "]");
  },
  activated() {
    console.log("界面被激活...");
  },
  deactivated() {
    console.log("界面失效...");
  },
  created() {
    //节点编辑调用函数
    bus.$on("nsneoEditNode", msg => {
      this.nsneoEditNode(msg);
      //console.log('编辑节点----');
    });
  },
  beforeDestroy() {
    console.log("界面被销毁...");
    this.destroyMXGraph();
  }
};
</script>

<style scoped>
.nsneo-inner-root {
  background: #ffffff;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.nsneo-inner-header {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  padding-right: 15px;
}
.nsneo-inner-container {
  flex: 1;
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
  margin-bottom: 1px;
}

.ivu-collapse {
  border-left: none !important;
  border-right: none !important;
}

.split-pane-left {
  overflow-y: auto;
  height: 100%;
  overflow-x: hidden;
}
.split-pane-right {
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding-left: 5px;
}
.split-pane-right-root {
  width: 100%;
  height: 100%;
  padding: 5px;
  background: #eee url("../../../assets/imgs/grid.gif") 0 0 repeat;
}

.nsneo-cascontent {
  padding: 5px;
}

.nsneo-mxgraph-content {
  flex: 1;
  display: flex;
  font-size: 12px;
  margin: 5px;
}
.nsneo-mxgraph-left {
  width: 220px;
  height: 100%;
  border: 1px solid #e9e9e9;
  margin-right: 5px;
}

.nsneo-mxgraph-right {
  width: 220px;
  height: 100%;
  border: 1px solid #e9e9e9;
  margin-left: 5px;
  padding: 5px;
}

.nsneo-mxgraph-left-itemset {
  border-top: 1px solid #e9e9e9;
}
.nsneo-mxgraph-left > .nsneo-mxgraph-left-itemset:first-child {
  border-top: none !important;
}
.nsneo-mxgraph-left-itemset-title {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  font-size: 14px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e9e9e9;
}

.nsneo-mxgraph-left-itemset-content > .nsneo-mxgraph-left-item {
  width: 80px;
  height: 80px;
  margin: 5px;
  text-align: center;
  display: inline-block;
}

.nsneo-mxgraph-left-itemset-content > .nsneo-mxgraph-left-item > img {
  width: 60px;
  height: 60px;
}

.nsneo-mxgraph-left-itemset-content > .nsneo-mxgraph-left-item > div {
  text-align: center;
}

.nsneo-mxgraph-carea {
  flex: 1;
  height: 100%;
  border: 1px solid #e9e9e9;
  overflow: hidden;
}

.ivu-form-item {
  margin-bottom: 2px;
}
</style>

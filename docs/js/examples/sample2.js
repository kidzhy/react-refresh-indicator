'use strict';

var SAMPLE2_COMPONENT = '\nvar Sample2 = React.createClass({\n  getInitialState: function() {\n    this._indicatorSize = 40;\n    return {\n      indicatorPercentage: 0,\n      indicatorY: -this._indicatorSize,\n      indicatorStatus: "hide",\n    };\n  },\n  render: function () {\n    return (\n      <div style={{\n          position: "relative",\n          width: 236,\n          height: 300,\n          margin: "0 auto",\n          overflow: "hidden",\n          border: "1px dashed #999",\n        }}\n        onMouseDown={this._handleMouseDown}\n        onMouseMove={this._handleMouseMove}\n        onMouseUp={this._handleMouseUp}\n      >\n        <RefreshIndicator\n          percentage={this.state.indicatorPercentage}\n          top={this.state.indicatorY}\n          left={236 / 2 - 40 / 2}\n          size={this._indicatorSize}\n          status={this.state.indicatorStatus}\n        />\n      </div>\n    );\n  },\n  _handleMouseDown: function(e) {\n    this._mouseDownY = e.pageY;\n    this._maybePull = true;\n  },\n\n  _handleMouseMove: function(e) {\n    if (!this._maybePull) return;\n\n    var currY = e.pageY;\n    var offsetY = currY - this._mouseDownY;\n    if (offsetY > 0) {\n      offsetY = Math.min(offsetY, 100);\n      var percentage = offsetY * 100 / 100;\n      this.setState({\n        indicatorPercentage: percentage,\n        indicatorY: offsetY - this._indicatorSize,\n        indicatorStatus: "ready",\n      });\n      if (percentage === 100) {\n        this._pulling = true;\n      } else {\n        this._pulling = false;\n      }\n    }\n  },\n\n  _handleMouseUp: function(e) {\n    this._maybePull = false;\n\n    if (this._pulling) {\n      this.setState({\n        indicatorStatus: "loading",\n      });\n      setTimeout(function(me) {\n        me.setState({\n          indicatorStatus: "hide",\n          indicatorY: -me._indicatorSize,\n        });\n      }, 5000, this);\n    } else {\n      this.setState({\n        indicatorStatus: "hide",\n        indicatorY: -this._indicatorSize,\n      });\n    }\n  }\n});\n\nReact.render(<Sample2 />, mountNode);\n';

React.render(React.createElement(ReactPlayground, { codeText: SAMPLE2_COMPONENT }), document.getElementById('sample2'));
const { OPCUAServer } = require("node-opcua");

module.exports = function(RED) {
    function OPCUAXLabServer(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        const server = new OPCUAServer({
            port: 4840,
            resourcePath: "/UA/XLabServer",
            productUri: "http://xlab.io/opcua-server",
            buildInfo: {
                productName: "XLab OPC UA Server",
                buildNumber: "1.0.2",
                buildDate: new Date(),
                manufacturerName: "xlab.io"
            }
        });

        server.initialize(() => {
            node.log("XLab OPC UA Server initialized");
            server.start(() => {
                node.log("XLab OPC UA Server is now listening on port 4840");
            });
        });

        node.on("close", done => {
            server.shutdown(1000, () => {
                node.log("XLab OPC UA Server shut down");
                done();
            });
        });
    }

    RED.nodes.registerType("OPCUAXLabServer", OPCUAXLabServer);
};

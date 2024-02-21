import { DefGraph } from "./DefGraph";

describe("DefGraph", () => {
  it("should create a root spec node", () => {
    const rootSpec = {
      name: "RootSpec",
      inputDefSet: { tags: [] },
      outputDefSet: { tags: [] },
    };
    const graph = new DefGraph({ root: rootSpec });
    const rootSpecNodeId = graph.getRootSpecNodeId();
    const rootSpecNode = graph.getNodeAttributes(rootSpecNodeId);
    expect(rootSpecNode).toHaveProperty("nodeType", "root-spec");
    expect(rootSpecNode).toHaveProperty("specName", rootSpec.name);
  });

  it("should add connected dual specs", () => {
    const graph = new DefGraph({
      root: {
        name: "RootSpec",
        inputDefSet: { tags: [] },
        outputDefSet: { tags: [] },
      },
    });
    const from = { specName: "SpecA", output: "outputA" };
    const to = { specName: "SpecB", input: "inputB", hasTransform: false };
    graph.addConnectedDualSpecs(from, to);
    const fromSpecNodeId = graph.findNode(
      (_, attrs) =>
        attrs.nodeType === "spec" && attrs.specName === from.specName
    );
    const toSpecNodeId = graph.findNode(
      (_, attrs) => attrs.nodeType === "spec" && attrs.specName === to.specName
    );
    expect(fromSpecNodeId).not.toBeNull();
    expect(toSpecNodeId).not.toBeNull();
    const fromOutletNodeId = graph.outboundNeighbors(fromSpecNodeId!)[0];
    expect(fromOutletNodeId).not.toBeNull();
    const streamNodeId = graph.outboundNeighbors(fromOutletNodeId!)[0];
    expect(streamNodeId).not.toBeNull();
    const toInletNodeId = graph.outboundNeighbors(streamNodeId!)[0];
    expect(toInletNodeId).not.toBeNull();
    expect(graph.hasEdge(toInletNodeId!, toSpecNodeId!)).toBe(true);
  });

  it("should return spec node IDs", () => {
    const graph = new DefGraph({
      root: {
        name: "RootSpec",
        inputDefSet: { tags: [] },
        outputDefSet: { tags: [] },
      },
    });
    // Add a spec node
    const specNodeId = graph.ensureNode("SpecA", {
      nodeType: "spec",
      specName: "SpecA",
      label: "SpecA",
    });
    // Add a non-spec node
    const nonSpecNodeId = graph.ensureNode("StreamA", {
      nodeType: "stream-def",
      streamDefId: "StreamA",
      label: "StreamA",
    });
    // Retrieve spec node IDs
    const specNodeIds = graph.getSpecNodeIds();
    expect(specNodeIds).toContain(specNodeId);
    expect(specNodeIds).not.toContain(nonSpecNodeId);
  });

  it("should ensure nodes are created and retrieved correctly", () => {
    const graph = new DefGraph({
      root: {
        name: "RootSpec",
        inputDefSet: { tags: [] },
        outputDefSet: { tags: [] },
      },
    });
    const nodeId = graph.ensureNode("TestNode", {
      nodeType: "spec",
      specName: "TestSpec",
      label: "TestNode",
    });
    expect(nodeId).not.toBeNull();
    const retrievedNode = graph.getNodeAttributes(nodeId);
    expect(retrievedNode).toEqual({
      nodeType: "spec",
      specName: "TestSpec",
      label: "TestNode",
    });

    // Ensure the same node is retrieved when called again with the same id
    const sameNodeId = graph.ensureNode("TestNode", {
      nodeType: "spec",
      specName: "TestSpec",
      label: "TestNode",
    });
    expect(sameNodeId).toEqual(nodeId);
  });
});
  it("should ensure inlets and streams are created correctly", () => {
    const graph = new DefGraph({
      root: {
        name: "RootSpec",
        inputDefSet: { tags: [] },
        outputDefSet: { tags: [] },
      },
    });
    const specName = "TestSpec";
    const tag = "inputTag";
    const hasTransform = true;

    // Ensure inlet and stream nodes are created
    graph.ensureInletAndStream({
      specName,
      tag,
      hasTransform,
    });

    // Check if the spec node is created
    const specNodeId = graph.findNode(
      (_, attrs) => attrs.nodeType === "spec" && attrs.specName === specName
    );
    expect(specNodeId).not.toBeNull();

    // Check if the inlet node is created
    const inletNodeId = graph.findNode(
      (_, attrs) =>
        attrs.nodeType === "inlet" && attrs.tag === tag && attrs.hasTransform === hasTransform
    );
    expect(inletNodeId).not.toBeNull();

    // Check if the stream node is created and connected to the inlet node
    const streamNodeId = graph.findNode(
      (_, attrs) => attrs.nodeType === "stream-def"
    );
    expect(streamNodeId).not.toBeNull();
    expect(graph.hasEdge(streamNodeId, inletNodeId)).toBe(true);
  });
  it("should ensure outlets and streams are created correctly", () => {
    const graph = new DefGraph({
      root: {
        name: "RootSpec",
        inputDefSet: { tags: [] },
        outputDefSet: { tags: [] },
      },
    });
    const specName = "TestSpec";
    const tag = "outputTag";

    // Ensure outlet and stream nodes are created
    graph.ensureOutletAndStream({
      specName,
      tag,
    });

    // Check if the spec node is created
    const specNodeId = graph.findNode(
      (_, attrs) => attrs.nodeType === "spec" && attrs.specName === specName
    );
    expect(specNodeId).not.toBeNull();

    // Check if the outlet node is created
    const outletNodeId = graph.findNode(
      (_, attrs) =>
        attrs.nodeType === "outlet" && attrs.tag === tag
    );
    expect(outletNodeId).not.toBeNull();

    // Check if the stream node is created and connected to the outlet node
    const streamNodeId = graph.findNode(
      (_, attrs) => attrs.nodeType === "stream-def"
    );
    expect(streamNodeId).not.toBeNull();
    expect(graph.hasEdge(specNodeId, outletNodeId)).toBe(true);
    expect(graph.hasEdge(outletNodeId, streamNodeId)).toBe(true);
  });
  it("should ensure edges are created and retrieved correctly", () => {
    const graph = new DefGraph({
      root: {
        name: "RootSpec",
        inputDefSet: { tags: [] },
        outputDefSet: { tags: [] },
      },
    });
    const fromNodeId = graph.ensureNode("FromNode", {
      nodeType: "spec",
      specName: "FromSpec",
      label: "FromNode",
    });
    const toNodeId = graph.ensureNode("ToNode", {
      nodeType: "spec",
      specName: "ToSpec",
      label: "ToNode",
    });

    // Ensure edge is created
    graph.ensureEdge(fromNodeId, toNodeId);
    expect(graph.hasEdge(fromNodeId, toNodeId)).toBe(true);

    // Ensure edge is not duplicated
    graph.ensureEdge(fromNodeId, toNodeId);
    expect(graph.edges().length).toBe(1);

    // Ensure edge attributes are updated
    graph.ensureEdge(fromNodeId, toNodeId, { weight: 10 });
    const edgeAttributes = graph.getEdgeAttributes(fromNodeId, toNodeId);
    expect(edgeAttributes).toHaveProperty("weight", 10);
  });
  it("should return inbound node sets for a spec node", () => {
    const graph = new DefGraph({
      root: {
        name: "RootSpec",
        inputDefSet: { tags: ["input1", "input2"] },
        outputDefSet: { tags: [] },
      },
    });
    const specNodeId = graph.ensureNode("SpecA", {
      nodeType: "spec",
      specName: "SpecA",
      label: "SpecA",
    });
    // Ensure inlet and stream nodes are created for SpecA
    graph.ensureInletAndStream({
      specName: "SpecA",
      tag: "input1",
      hasTransform: false,
    });
    graph.ensureInletAndStream({
      specName: "SpecA",
      tag: "input2",
      hasTransform: true,
    });
    // Retrieve inbound node sets
    const inboundNodeSets = graph.getInboundNodeSets(specNodeId);
    expect(inboundNodeSets).toHaveLength(2);
    expect(inboundNodeSets[0]).toHaveProperty("inletNode");
    expect(inboundNodeSets[0]).toHaveProperty("streamNode");
    expect(inboundNodeSets[0].inletNode).toHaveProperty("tag", "input1");
    expect(inboundNodeSets[0].inletNode).toHaveProperty("hasTransform", false);
    expect(inboundNodeSets[1].inletNode).toHaveProperty("tag", "input2");
    expect(inboundNodeSets[1].inletNode).toHaveProperty("hasTransform", true);
  });
  it("should return outbound node sets for a spec node", () => {
    const graph = new DefGraph({
      root: {
        name: "RootSpec",
        inputDefSet: { tags: [] },
        outputDefSet: { tags: ["output1", "output2"] },
      },
    });
    const specNodeId = graph.ensureNode("SpecA", {
      nodeType: "spec",
      specName: "SpecA",
      label: "SpecA",
    });
    // Ensure outlet and stream nodes are created for SpecA
    graph.ensureOutletAndStream({
      specName: "SpecA",
      tag: "output1",
    });
    graph.ensureOutletAndStream({
      specName: "SpecA",
      tag: "output2",
    });
    // Retrieve outbound node sets
    const outboundNodeSets = graph.getOutboundNodeSets(specNodeId);
    expect(outboundNodeSets).toHaveLength(2);
    expect(outboundNodeSets[0]).toHaveProperty("outletNode");
    expect(outboundNodeSets[0]).toHaveProperty("streamNode");
    expect(outboundNodeSets[0].outletNode).toHaveProperty("tag", "output1");
    expect(outboundNodeSets[1].outletNode).toHaveProperty("tag", "output2");
  });
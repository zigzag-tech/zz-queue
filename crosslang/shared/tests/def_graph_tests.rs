use assert_matches::assert_matches;
use livestack_shared::systems::def_graph::DefGraph;
use livestack_shared::systems::def_graph::DefGraphNode;
use livestack_shared::systems::def_graph::NodeType;
use petgraph::graph::NodeIndex;

#[cfg(test)]
mod tests {
    use super::*;

    use super::*;
    use assert_matches::assert_matches;
    use petgraph::dot::{Config, Dot};

    #[test]
    fn test_ensure_inlet_and_stream() {
        let mut graph = DefGraph::new();
        let spec_name = "TestSpec";
        let tag = "inputTag";
        let has_transform = true;

        // Ensure inlet and stream nodes are created
        let (inlet_node_id, stream_node_id) =
            graph.ensure_inlet_and_stream(spec_name, tag, has_transform);

        // Check if the spec node is created
        let spec_node_id = graph
            .find_node(|attrs| {
                attrs.node_type == NodeType::Spec && attrs.spec_name.as_deref() == Some(spec_name)
            })
            .expect("Spec node should exist");

        // Check if the inlet node is created
        assert_matches!(graph.graph.node_weight(inlet_node_id), Some(node) if node.node_type == NodeType::Inlet && node.tag.as_deref() == Some(tag) && node.has_transform == Some(has_transform));

        // Check if the inlet node is connected to the spec node
        assert!(
            graph.graph.contains_edge(inlet_node_id, spec_node_id),
            "Inlet node should be connected to the spec node"
        );

        // Check if the stream node is created and connected to the inlet node
        assert_matches!(graph.graph.node_weight(stream_node_id), Some(node) if node.node_type == NodeType::StreamDef && node.stream_def_id == Some(format!("{}_{}_stream", spec_name, tag)));
        assert!(
            graph.graph.contains_edge(stream_node_id, inlet_node_id),
            "Stream node should be connected to the inlet node"
        );
    }

    #[test]
    fn test_get_spec_node_ids() {
        let mut graph = DefGraph::new();

        // Add a spec node
        let spec_node_data = DefGraphNode {
            node_type: NodeType::Spec,
            spec_name: Some("SpecA".to_string()),
            unique_spec_label: None,
            tag: None,
            has_transform: None,
            stream_def_id: None,
            alias: None,
            direction: None,
            label: "SpecA".to_string(),
        };
        let spec_node_id = graph.ensure_node("SpecA", spec_node_data);

        // Add a non-spec node
        let non_spec_node_data = DefGraphNode {
            node_type: NodeType::StreamDef,
            spec_name: None,
            unique_spec_label: None,
            tag: None,
            has_transform: None,
            stream_def_id: Some("StreamA".to_string()),
            alias: None,
            direction: None,
            label: "StreamA".to_string(),
        };
        let non_spec_node_id = graph.ensure_node("StreamA", non_spec_node_data);

        // Retrieve spec node IDs
        let spec_node_ids = graph.get_spec_node_ids();
        assert!(spec_node_ids.contains(&spec_node_id));
        assert!(!spec_node_ids.contains(&non_spec_node_id));
    }

    #[test]
    fn test_ensure_node() {
        let mut graph = DefGraph::new();
        // ... (rest of the test_ensure_node)

        // Ensure a node is created
        let test_node = DefGraphNode {
            node_type: NodeType::Spec,
            spec_name: Some("TestSpec".to_string()),
            unique_spec_label: None,
            tag: None,
            has_transform: None,
            stream_def_id: None,
            alias: None,
            direction: None,
            label: "TestNode".to_string(),
        };
        let node_id = graph.ensure_node("TestNode", test_node.clone());
        assert_matches!(graph.graph.node_weight(node_id), Some(node) if node == &test_node);

        // Ensure the same node is retrieved with the same ID
        let same_node_id = graph.ensure_node("TestNode", test_node.clone());
        assert_eq!(node_id, same_node_id);

        // Ensure the node data is not overwritten if the same ID is used
        // assign a different value to the `label` field
        let different_test_node = DefGraphNode {
            label: "DifferentTestNode".to_string(),
            ..test_node.clone()
        };

        let same_node_id_with_different_data =
            graph.ensure_node("TestNode", different_test_node.clone());
        assert_eq!(
            node_id, same_node_id_with_different_data,
            "The node data should not be overwritten if the same ID is used",
        );
        let node_data = graph.graph.node_weight(same_node_id_with_different_data);

        assert_matches!(
            node_data,
            Some(node) if node == &test_node,
            "The node data should not be overwritten if the same ID is used",
        );
    }

    #[test]
    fn test_ensure_outlet_and_stream() {
        let mut graph = DefGraph::new();
        let spec_name = "TestSpec";
        let tag = "outputTag";

        // Ensure outlet and stream nodes are created
        let (outlet_node_id, stream_node_id) = graph.ensure_outlet_and_stream(spec_name, tag);

        // Check if the spec node is created
        let spec_node_id = graph
            .find_node(|attrs| {
                attrs.node_type == NodeType::Spec && attrs.spec_name.as_deref() == Some(spec_name)
            })
            .expect("Spec node should exist");

        // Check if the outlet node is created
        assert_matches!(graph.graph.node_weight(outlet_node_id), Some(node) if node.node_type == NodeType::Outlet && node.tag.as_deref() == Some(tag));

        // Check if the outlet node is connected to the spec node
        assert!(
            graph.graph.contains_edge(spec_node_id, outlet_node_id),
            "Outlet node should be connected to the spec node"
        );

        // Check if the stream node is created and connected to the outlet node
        assert_matches!(graph.graph.node_weight(stream_node_id), Some(node) if node.node_type == NodeType::StreamDef && node.stream_def_id == Some(format!("{}_{}_stream", spec_name, tag)));
        assert!(
            graph.graph.contains_edge(outlet_node_id, stream_node_id),
            "Stream node should be connected to the outlet node"
        );
    }

    #[test]
    fn test_ensure_edge() {
        let mut graph = DefGraph::new();
        let from_node = DefGraphNode {
            node_type: NodeType::Spec,
            spec_name: Some("FromSpec".to_string()),
            unique_spec_label: None,
            tag: None,
            has_transform: None,
            stream_def_id: None,
            alias: None,
            direction: None,
            label: "FromNode".to_string(),
        };
        let to_node = DefGraphNode {
            node_type: NodeType::Spec,
            spec_name: Some("ToSpec".to_string()),
            unique_spec_label: None,
            tag: None,
            has_transform: None,
            stream_def_id: None,
            alias: None,
            direction: None,
            label: "ToNode".to_string(),
        };
        let from_index = graph.ensure_node("FromNode", from_node);
        let to_index = graph.ensure_node("ToNode", to_node);
        graph.ensure_edge("FromNode", "ToNode");
        assert!(
            graph.graph.contains_edge(from_index, to_index),
            "Edge should exist from FromNode to ToNode"
        );
        graph.ensure_edge("FromNode", "ToNode");
        let edges: Vec<_> = graph.graph.edges_connecting(from_index, to_index).collect();
        assert_eq!(
            edges.len(),
            1,
            "There should only be one edge from FromNode to ToNode"
        );
    }
    fn test_filter_inbound_neighbors() {
        let mut graph = DefGraph::new();
        let spec_name = "TestSpec";
        let tag = "inputTag";
        let has_transform = true;
        // Ensure inlet and stream nodes are created
        let (inlet_node_id, stream_node_id) =
            graph.ensure_inlet_and_stream(spec_name, tag, has_transform);
        // Add another inlet node with a different tag
        let other_tag = "otherInputTag";
        let (_, other_stream_node_id) =
            graph.ensure_inlet_and_stream(spec_name, other_tag, has_transform);
        // Filter inbound neighbors for the spec node with a specific tag
        let filtered_inbound_neighbors = graph.filter_inbound_neighbors(spec_name, |node| {
            node.node_type == NodeType::Inlet && node.tag.as_deref() == Some(tag)
        });
        assert_eq!(filtered_inbound_neighbors.len(), 1);
        assert_eq!(filtered_inbound_neighbors[0], inlet_node_id);
        // Ensure that the other inlet node is not included
        assert!(!filtered_inbound_neighbors.contains(&other_stream_node_id));
    }
}

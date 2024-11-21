import React from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap"; // Import Badge component from React-Bootstrap

const badgeStyles = {
  Pending: "warning", // Maps to <Badge bg="warning">
  Approved: "success", // Maps to <Badge bg="success">
  "Waiting Payment": "warning", // Maps to <Badge bg="info">
  Completed: "success", // Maps to <Badge bg="primary">
};

export default function StatusBadge({ status }) {
  // Determine the badge style based on status
  const badgeVariant = badgeStyles[status] || "secondary"; // Default to "secondary" for unknown statuses

  return <Badge bg={badgeVariant}>{status}</Badge>;
}



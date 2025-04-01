import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function LogoutModal({ show, handleClose, handleLogout }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to logout?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
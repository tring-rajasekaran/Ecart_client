import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function Location({ show, handleClose, address, loading, error }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Current Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading your location...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <p>{address ? address : "Unable to fetch location."}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

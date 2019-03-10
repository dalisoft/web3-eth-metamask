/* eslint-disable react/prop-types */
import { Modal, Content, Delete } from 'rbx';

import './style.scss';

const ModalComponent = ({
  title, content, footer, isEnabled, toggleModal
}) => isEnabled && (
  <div className="app__modal_popup" key="app__modal_popup-index">
    <Modal.Background />
    <Modal.Card>
      <Modal.Card.Head>
        <Modal.Card.Title>{title}</Modal.Card.Title>
        <Delete onClick={toggleModal} />
      </Modal.Card.Head>
      <Modal.Card.Body>
        <Content>{content}</Content>
      </Modal.Card.Body>
      <Modal.Card.Foot>{footer}</Modal.Card.Foot>
    </Modal.Card>
  </div>
);

export default ModalComponent;

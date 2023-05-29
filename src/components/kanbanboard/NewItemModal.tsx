export default function NewItemModal() {
  return (
    <>
      <div className="backdrop"></div>
      <div className="modal">
        <h3 className="modal-heading">Main heading</h3>
        <input placeholder="Task title" />
        <textarea placeholder="Task description" />
        <p>Card label</p>
        <ul>
          <li>Feature</li>
          <li>Refactor</li>
          <li>Bug</li>
          <li>Other</li>
        </ul>
      </div>
    </>
  );
}

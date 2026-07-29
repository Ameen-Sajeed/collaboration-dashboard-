import type { CommunicationHook } from "../types/communication";

interface Props {
  mode: CommunicationHook;
  onChange: (mode: CommunicationHook) => void;
}

function ModeSelector({ mode, onChange }: Props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label>
        Communication:
      </label>

      <select
        value={mode}
        onChange={(e) =>
          onChange(e.target.value as CommunicationHook)
        }
      >
        <option value="rest">REST</option>
        <option value="shortPolling">Short Polling</option>
        <option value="longPolling">Long Polling</option>
        <option value="sse">Server Sent Events</option>
        <option value="websocket">WebSocket</option>
      </select>
    </div>
  );
}

export default ModeSelector;
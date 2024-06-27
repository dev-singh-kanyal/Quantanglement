import cirq
import numpy as np
import json

def server_measurement(qubits, basis):
    """Server measures the qubits in the specified basis."""
    for i, qubit in enumerate(qubits):
        if basis[i] == 0:  # Measure in Z basis
            yield cirq.measure(qubit, key=f'B{i}')
        else:  # Measure in X basis
            yield cirq.H(qubit)
            yield cirq.measure(qubit, key=f'B{i}')
            yield cirq.H(qubit)

def generate_key():
    """Generate a shared key at the server."""
    with open("../client/key/client.json", "r") as infile:
        client_data = json.load(infile)
    
    client_basis = np.array(client_data.get("client_basis", []))
    client_qubits = [cirq.LineQubit(x) for x in client_data.get("client_qubits", [])]  
    
    num_qubits = len(client_qubits)
    
    server_basis = np.random.randint(2, size=num_qubits)  
    server_measurement_gen = server_measurement(client_qubits, server_basis)
    
    circuit = cirq.Circuit()
    circuit.append(server_measurement_gen)  
    
    sim = cirq.Simulator()
    results = sim.run(circuit)
    
    shared_key = ''
    for i in range(num_qubits):
        if client_basis[i] == server_basis[i]:
            shared_key += str(results.measurements[f'B{i}'][0][0])
    
    data = {
        "server_basis": server_basis.tolist(),
        "results": {key: val.tolist() for key, val in results.measurements.items()}
    }

    with open("../client/key/server.json", "w") as outfile:
        json.dump(data, outfile)
    
    print("Shared Key at server:", shared_key)

if __name__ == "__main__":
    generate_key()

import cirq
import numpy as np

def alice_circuit(qubits, basis):
    """Alice generates a random bit string and encodes it onto qubits."""
    for i, bit in enumerate(qubits):
        if bit == 1:
            if basis[i] == 0:  # Prepare qubit in Z basis
                yield cirq.X(qubits[i])
            else:  # Prepare qubit in X basis
                yield cirq.H(qubits[i])

def bob_measurement(qubits, basis):
    """Bob measures the qubits in the specified basis."""
    for i, qubit in enumerate(qubits):
        if basis[i] == 0:  # Measure in Z basis
            yield cirq.measure(qubit, key=f'B{i}')
        else:  # Measure in X basis
            yield cirq.H(qubit)
            yield cirq.measure(qubit, key=f'B{i}')
            yield cirq.H(qubit)

def generate_key():
    num_qubits = 10
    
    alice_qubits = cirq.LineQubit.range(num_qubits)
    alice_basis = np.random.randint(2, size=num_qubits)  # Randomly choose X or Z basis
    alice_circuit_gen = alice_circuit(alice_qubits, alice_basis)
    
    bob_basis = np.random.randint(2, size=num_qubits)  # Randomly choose X or Z basis for measurement
    bob_measurement_gen = bob_measurement(alice_qubits, bob_basis)
    
    circuit = cirq.Circuit()
    circuit.append(alice_circuit_gen)
    circuit.append(bob_measurement_gen)
    
    sim = cirq.Simulator()
    results = sim.run(circuit)
    
    shared_key = ''
    for i in range(num_qubits):
        if alice_basis[i] == bob_basis[i]:
            shared_key += str(results.measurements[f'B{i}'][0][0])
    
    return shared_key

if __name__ == "__main__":
    key = generate_key()
    print("Shared Key:", key)
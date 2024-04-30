import os
import time
import cirq
import numpy as np
import json

def client_circuit(qubits, basis):
    """Client generates a random bit string and encodes it onto qubits."""
    for i, bit in enumerate(qubits):
        if bit == 1:
            if basis[i] == 0:  
                # Prepare qubit in Z basis
                yield cirq.X(qubits[i])
            else:  
                # Prepare qubit in X basis
                yield cirq.H(qubits[i])

def generate_key():
    """Generate a shared key between client and server."""
    num_qubits = 10
    client_qubits = cirq.LineQubit.range(num_qubits)

    # Randomly choose X or Z basis
    client_basis = np.random.randint(2, size=num_qubits)  

    # Convert the data to be stored into lists for JSON serialization
    client_qubits_list = [qubit.x for qubit in client_qubits]  
    # Store only the integer index of each qubit
    
    # Store the data into a dictionary
    data = {
        "client_qubits": client_qubits_list,
        "client_basis": client_basis.tolist(),
    }

    # Write the data to a JSON file
    with open("key/client.json", "w") as outfile:
        json.dump(data, outfile)
    
    # Wait until server.json is generated or timeout after 5 minutes
    print("Waiting for server.json")
    start_time = time.time()
    while True:
        if os.path.exists("key/server.json") and os.path.getsize("key/server.json") > 0:
            break
        elif time.time() - start_time > 5 * 60:  # Timeout after 5 minutes
            print("Timeout waiting for server.json")
            break
        time.sleep(1)


    # Read the data from the server.json file
    if os.path.exists("key/server.json"):
        with open("key/server.json", "r") as infile:
            server_data = json.load(infile)
    
    server_basis = server_data.get("server_basis", [])
    results = server_data.get("results", {})
    
    shared_key = ''
    for i in range(num_qubits):
        if client_basis[i] == server_basis[i]:
            shared_key += str(results[f'B{i}'][0][0])
    
    return shared_key

if __name__ == "__main__":
    key = generate_key()
    print("Shared Key:", key)

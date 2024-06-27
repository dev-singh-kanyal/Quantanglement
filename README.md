# Quantum-Archive

A chatbot using Large Language Models (LLMs) to answer quantum queries and provide responses from verified sources only. Also having feature for chatting with friends using quantum encryption.

## Flow

- crypto - one to one communiucation with server
```
  .\client\  
   run.bat (as admin) or py key.py

  .\server\  
   py server.py
```
-  chat - inteface for chatting  
```
    .\chat\  
    npm start

    .\server\
    node index
```
- chat - controls group and key generation
```
    .\chat-server  
    npm start
```
- bot-server - for bot virtual environment 
``` 
    .\bot-server  
    pip install -r requirements.txt    
    add pdf to .\bot-server\docs 
    python .\ingest.py  
    streamlit run .\chatbot_app.py         
```

## Contributors

- Dev Singh Kanyal
- Priya Sinha
- Sherine Horo
- Shimon Shiromani

FROM python:3.10
WORKDIR /utils
COPY . /utils
# Install any necessary libraries
RUN apt update && apt install -y ffmpeg
RUN pip install -r requirements.txt
# RUN python3 ./server.py
CMD [ "python3", "./server.py" ]
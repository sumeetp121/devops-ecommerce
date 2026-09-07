import os
from kafka import KafkaProducer
import json

KAFKA_BOOTSTRAP_SERVERS = os.getenv(
    "KAFKA_BOOTSTRAP_SERVERS",
    "localhost:9092"
)

producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
    value_serializer=lambda value: json.dumps(value).encode("utf-8"),
)


def send_product_event(event):
    future = producer.send("product-events", event)
    result = future.get(timeout=10)
    print(
        f"Kafka event sent successfully: "
        f"topic={result.topic}, partition={result.partition}, offset={result.offset}"
    )
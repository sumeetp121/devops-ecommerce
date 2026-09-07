from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    "product-events",
    bootstrap_servers="kafka:9094",
    value_deserializer=lambda value: json.loads(value.decode("utf-8")),
    group_id="product-event-consumer",
    auto_offset_reset="earliest",
)

print("Kafka consumer started...")

for message in consumer:
    print("Received event:", message.value)
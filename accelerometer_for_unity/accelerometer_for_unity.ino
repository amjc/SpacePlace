void setup(){
  Serial.begin(9600);
  pinMode(9, INPUT);
}

void loop(){
  Serial.print(analogRead(0));
  Serial.print(",");
  Serial.print(analogRead(1));
  Serial.print(",");
  Serial.print(analogRead(2));
  Serial.print(",");
  Serial.print(digitalRead(9));
  Serial.println(",");
}

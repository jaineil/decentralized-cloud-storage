package main

import (
	"context"
	"example/backend/db/config"
	"example/backend/services/file"
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Server started on port 8080")

	http.HandleFunc("/renter/file/uploadFile", file.UploadFile)
	http.HandleFunc("/renter/file/downloadFile", file.DownloadFile)
	http.HandleFunc("/renter/file/deleteFile", file.DeleteFile)

	err := config.DB.Ping(context.TODO(), nil)
	if err != nil {
		fmt.Println("Error pinging to MongoDB: ", err)
		panic(err)
	}

	/*
		// CREATING A RENTER DOCUMENT

		var bucketIds = make([]primitive.ObjectID, 0)
		renter := models.Renter{Name: "testRenter1", Email: "testRenter1@renter.com", Password: "testRenter1", Mobile: "1234567890", Location: "SJC", Buckets: bucketIds, TotalBuckets: 0, TotalNumberOfFiles: 0, TotalStorageUsed: 0, TotalBandwidth: 0}
		res, err := rentersCollection.InsertOne(context.TODO(), renter)
		if err != nil {
			fmt.Println("Error inserting to MongoDB: ", err)
			return
		}

		fmt.Println("Inserted: ", res.InsertedID)

	*/

	/*

		// UPDATING A BUCKET ID INSIDE []BUCKETS WITHIN RENTER DOCUMENT

		var bucketId, _ = primitive.ObjectIDFromHex("642287487a2d1c86cf9dd3f5")

		var renterId, _ = primitive.ObjectIDFromHex("64228d510c4f6ffa8401ea01")

		result, err := rentersCollection.UpdateOne(
			ctx,
			bson.M{"_id": renterId},
			bson.M{"$push": bson.M{"buckets": bucketId}},
		)

		if err != nil {
			fmt.Println("Error updating to MongoDB: ", err)
			return
		}

		fmt.Println("Updated Documents! ", result.ModifiedCount)

	*/

	/*
		// CREATING A BUCKET DOCUMENT

		renterId, err := primitive.ObjectIDFromHex("6422826f24e6f72edf8796bc")
		if err != nil {
			fmt.Println("Error converting to ObjectID: ", err)
			return
		}

		bucketObj := models.Bucket{BucketName: "testBucket1", RenterId: renterId, CreationTime: time.Now(), StorageBackend: "storj", Files: []models.File{}}
		res, err := config.GetCollection(config.DB, "buckets").InsertOne(context.TODO(), bucketObj)
		if err != nil {
			fmt.Println("Error inserting to MongoDB: ", err)
			return
		}
		fmt.Println("Inserted: ", res.InsertedID)

	*/

	http.ListenAndServe(":8080", nil)
}

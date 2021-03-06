// ==++==
//
//   
//    Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
//   
//    The use and distribution terms for this software are contained in the file
//    named license.txt, which can be found in the root of this distribution.
//    By using this software in any fashion, you are agreeing to be bound by the
//    terms of this license.
//   
//    You must not remove this notice, or any other, from this software.
//   
//
// ==--==
using System;
using System.IO;
using System.Collections;
using System.Globalization;
using System.Text;
using System.Threading;
public class co9002SetAttributes_str_attrs
{
	public static String s_strDtTmVer       = "";
	public static String s_strClassMethod   = "File.Directory()";
	public static String s_strTFName        = "co9002SetAttributes_str_attrs.cs";
	public static String s_strTFAbbrev      = s_strTFName.Substring(0,6);
	public static String s_strTFPath        = Environment.CurrentDirectory;
	public bool runTest()
	{
		Console.WriteLine(s_strTFPath + "\\" + s_strTFName + " , for " + s_strClassMethod + " , Source ver " + s_strDtTmVer);
		String strValue = String.Empty;
		int iCountErrors = 0;
		int iCountTestcases = 0;
                String strLoc = ""; 
		try
		{
			String fileName = s_strTFAbbrev+"TestFile";			
			FileInfo file1;
			strLoc = "loc_0000";
			iCountTestcases++;
			try {
			        File.SetAttributes(strValue, FileAttributes.Hidden);
				iCountErrors++;
				printerr( "Error_0001! Expected exception not thrown");
			} catch ( ArgumentException aexc) {
				printinfo( "Info_0002! Caught expected exception, aexc=="+aexc.Message);
			} catch ( Exception exc) {
				iCountErrors++;
				printerr( "Error_0003! Incorrect exception thrown, exc=="+exc.ToString());
			}
			strLoc = "loc_0004";
			iCountTestcases++;
			try {
			        File.SetAttributes(null, FileAttributes.Hidden);
				iCountErrors++;
				printerr( "Error_0005! Expected exception not thrown");
			} catch ( ArgumentException aexc) {
				printinfo( "Info_0006! Caught expected exception, aexc=="+aexc.Message);
			} catch ( Exception exc) {
				iCountErrors++;
				printerr( "Error_0007! Incorrect exception thrown, exc=="+exc.ToString());
			}
                        strLoc = "loc_0005";
			iCountTestcases++;
			try {
			        File.SetAttributes("c:\\this is an invalid testing directory\\test\\test", FileAttributes.Hidden);
				iCountErrors++;
				printerr( "Error_0006! Expected exception not thrown");
			} catch ( DirectoryNotFoundException dnfexc) {
				printinfo( "Info_0007! Caught expected exception, dnfexc=="+dnfexc.Message);
			} catch ( Exception exc) {
				iCountErrors++;
				printerr( "Error_0008! Incorrect exception thrown, exc=="+exc.ToString());
			}
			strLoc = "Loc_0009";
			file1 = new FileInfo(fileName);
                        FileStream fs = file1.Create();
#if !PLATFORM_UNIX // can't set hidden or system attributes on Unix platforms
			iCountTestcases++;
                        File.SetAttributes(fileName , FileAttributes.Hidden);
                        if((File.GetAttributes(fileName) & FileAttributes.Hidden) != FileAttributes.Hidden) {
				iCountErrors++;
				printerr( "Error_0010! Hidden not set");
			}
                        iCountTestcases++;                        
         		file1.Refresh();
			File.SetAttributes(fileName , FileAttributes.System) ;
			if((File.GetAttributes(fileName) & FileAttributes.System) != FileAttributes.System) {
				iCountErrors++;
				printerr( "Error_0011! System not set");
			}
#endif //!PLATFORM_UNIX
                        File.SetAttributes(fileName ,FileAttributes.Archive);
			file1.Refresh();
			File.SetAttributes(fileName ,FileAttributes.ReadOnly | file1.Attributes);
			file1.Refresh();
			iCountTestcases++;
			if((File.GetAttributes(fileName) & FileAttributes.ReadOnly) != FileAttributes.ReadOnly) {
				iCountErrors++;
				printerr( "Error_0020! ReadOnly attribute not set");
			}
#if !PLATFORM_UNIX
                        iCountTestcases++;
			if((File.GetAttributes(fileName) & FileAttributes.Archive) != FileAttributes.Archive) {
				iCountErrors++;
				printerr( "Error_0021! Archive attribute not set");
			}
#endif //!PLATFORM_UNIX
                        File.SetAttributes(fileName ,FileAttributes.Normal);
                        fs.Close();
                        file1.Delete();
		} catch (Exception exc_general ) {
			++iCountErrors;
			Console.WriteLine (s_strTFAbbrev + " : Error Err_0021!  strLoc=="+ strLoc +", exc_general=="+exc_general.ToString());
		}
		if ( iCountErrors == 0 )
		{
			Console.WriteLine( "paSs. "+s_strTFName+" ,iCountTestcases=="+iCountTestcases.ToString());
			return true;
		}
		else
		{
			Console.WriteLine("FAiL! "+s_strTFName+" ,iCountErrors=="+iCountErrors.ToString() );
			return false;
		}
	}
	public void printerr ( String err )
	{
		Console.WriteLine ("POINTTOBREAK: ("+ s_strTFAbbrev + ") "+ err);
	}
	public void printinfo ( String info )
	{
		Console.WriteLine ("INFO: ("+ s_strTFAbbrev + ") "+ info);
	}
	public static void Main(String[] args)
	{
		bool bResult = false;
		co9002SetAttributes_str_attrs cbA = new co9002SetAttributes_str_attrs();
		try {
			bResult = cbA.runTest();
		} catch (Exception exc_main){
			bResult = false;
			Console.WriteLine(s_strTFAbbrev + " : FAiL! Error Err_9999zzz! Uncaught Exception in main(), exc_main=="+exc_main.ToString());
		}
		if (!bResult)
		{
			Console.WriteLine ("Path: "+s_strTFPath+"\\"+s_strTFName);
			Console.WriteLine( " " );
			Console.WriteLine( "FAiL!  "+ s_strTFAbbrev);
			Console.WriteLine( " " );
                }
		if (bResult) Environment.ExitCode = 0; else Environment.ExitCode = 1;
        }
}
